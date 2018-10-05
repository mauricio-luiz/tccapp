class QuestaoController{

    constructor(){        
        const $ = document.querySelector.bind(document);

        this._resposta = null;
        this._enunciado = $("#enunciado");
        this._quantidadeQuestao = $("#quantidadeQuestao");
        this._exercicio = $("#exercicio");
        this._verQuestoes = $("#verQuestoes");

        this._questoes = new Questoes();
        this._mensagemView = new MensagemView("#listaOpcoes");
        this._mensagem = new Mensagem("Nenhuma opção cadastrada! :(", "orange lighten-2");
        this._url = '/questao/salvar';

        this._opcoes = new Opcoes();
        this._opcoesView = new OpcoesView('#listaOpcoes');
        this._texto = $("#opcao");
    }

    adiciona(){
        const respostas = document.querySelectorAll("#listaOpcoes input[type=radio]");
        respostas.forEach( (input, indice) => {
            if(input.checked)  this._resposta = indice;
        });
        
        const listaOpcoes = document.querySelectorAll("#listaOpcoes textarea");
        let opcoesTextareas = [];
        listaOpcoes.forEach( (textarea, indice) => {
            opcoesTextareas.push(textarea.value);
        });

        this._questoes.adiciona(
            this._criaQuestao(this._enunciado.value, this._resposta, opcoesTextareas)
        );

        const request = {
            method : 'POST',
            body :  JSON.stringify({
                exercicio : this._exercicio.value,
                questoes : this._questoes
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        
        const self = this;
        fetch(this._url, request)
            .then( (response) => {
                self._incrementaQuestao();
                self._limpar();
                self._verQuestoes.classList.remove('disabled');
            })
            .catch( (e) => { console.log(e)} );

        (function smoothscroll(){
            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                 window.requestAnimationFrame(smoothscroll);
                 window.scrollTo (0,currentScroll - (currentScroll/5));
            }
        })();
    }

    adicionaOpcao(){

        let resposta = null;
        if(this._opcoes.tamanho() > 0){
            resposta = this._respostaCorrente();   
        }

        this._opcao = this._criaOpcao(this._texto.value, this._opcoes.letra(), resposta);
        this._opcoes.adiciona(this._opcao);
        this._opcoesView.update(this._opcoes);
        this._opcoesView.updateTextarea(this._opcoes);
        this._opcoesView.updateResposta(this._opcoes, resposta);
        this._texto.value = "";
    }

    _criaQuestao(enunciado, resposta, opcoes){
        return new Questao(
            enunciado,
            resposta,
            opcoes
        );
    }

    _criaOpcao(texto, numero, correta){
        return new Opcao(
            texto,
            numero,
            correta
        );
    }

    _incrementaQuestao(){
        this._quantidadeQuestao.textContent =  parseInt(this._quantidadeQuestao.textContent) + 1;
        this._quantidadeQuestao.classList = "new badge pulse";
        self = this;
        setTimeout(function(){ self._quantidadeQuestao.classList = "new badge"; }, 10000);
    }

    _limpar(){
        this._enunciado.value = "";
        this._mensagemView.update(this._mensagem);
        M.textareaAutoResize(this._enunciado);
        this._opcoes.esvazia();
        this._questoes.esvazia();
    }    

    _respostaCorrente(){
        let respostas = document.querySelectorAll("#listaOpcoes input[type=radio]");
        let resposta = null;
        respostas.forEach( (input, indice) => {
            if(input.checked)   resposta = indice;
        });
        return resposta;
    }
}