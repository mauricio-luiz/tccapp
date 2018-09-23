class QuestaoController{

    constructor(){        
        const $ = document.querySelector.bind(document);

        this._resposta = null;
        this._opcoes = [];
        this._enunciado = $("#enunciado");
        this._quantidadeQuestao = $("#quantidadeQuestao");
        this._exercicio = $("#exercicio");
        this._verQuestoes = $("#verQuestoes");

        this._questoes = new Questoes();        
        this._mensagemView = new MensagemView("#listaOpcoes");
        this._mensagem = new Mensagem("Nenhuma opção cadastrada! :(", "orange lighten-2");
        this._url = '/questao/salvar';
    }

    adiciona(){
        const respostas = document.querySelectorAll("#listaOpcoes input[type=radio]");
        respostas.forEach( (input) => {
            if(input.checked)  this._resposta = input.value;
        });
        
        this._questoes.adiciona(
            this._criaQuestao(this._enunciado.value, this._resposta, opcao.opcoes())
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
        
        fetch(this._url, request)
            .then( (response) => {
                console.log('response', response);
                this._incrementaQuestao();
                this._limpar();
                opcao.limparOpcoes();
                this._verQuestoes.classList.remove('disabled');
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

    _criaQuestao(enunciado, resposta, opcoes){
        return new Questao(
            enunciado,
            resposta,
            opcoes
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
    }
}