class QuestaoController{

    constructor(){        
        const $ = document.querySelector.bind(document);

        this._resposta = null;
        this._enunciado = $("#enunciado");
        this._disciplina = $('#disciplina');
        this._nome = $('#nome');
        this._quantidadeQuestao = $("#quantidadeQuestao");
        this._exercicio = $("#exercicio");
        this._verQuestoes = $("#verQuestoes");
        this._salvaECriaProxima = $("#salvaECriaProxima");
        this._finalizarESair = $("#finalizarESair");

        this._questoes = new Questoes();
        this._opcoes = new Opcoes();
        
        this._url = '/questao/salvar';

        if(! $('#listaOpcoes')) return;
        
        this._opcoesView = new OpcoesView('#listaOpcoes');
        this._criaOpcoesPadroes();    

        this._salvaECriaProxima
        .addEventListener('click', this.salva.bind(this));

        this._finalizarESair
        .addEventListener('click', this.finaliza.bind(this));
        
    }

    adicionaOpcao(){
        const respostas = document.querySelectorAll("#listaOpcoes input[type=radio]");
        const textos = document.querySelectorAll("#listaOpcoes textarea");
        this._adicionaTextos(textos);
        this._adicionaQuestaoCorreta(respostas);
        
        this._opcao = this._criaOpcao('', this._opcoes.letra(), false);
        this._opcoes.adiciona(this._opcao);
        this._opcoesView.update(this._opcoes);
        this._opcoesView.updateTextarea(this._opcoes);
        this._adicionaEventoRemoverBotao();
    }

    removeOpcao(botao, indice){
        const resposta = document.querySelector("#listaOpcoes input[type=radio]:checked");             
        this._opcoes.remove(indice);
        this._opcoesView.refresh(this._opcoes);
        this._adicionaEventoRemoverBotao();

        const nova_resposta = document.querySelector(`#listaOpcoes input[type="radio"][value="${resposta.value}"]`);
        if(nova_resposta) nova_resposta.checked = true;
    }

    async salva(e){
        e.preventDefault();
        const resposta = document.querySelector("#listaOpcoes input[type=radio]:checked").value;
        const respostas = document.querySelectorAll("#listaOpcoes input[type=radio]");
        const textos = document.querySelectorAll("#listaOpcoes textarea");
        this._adicionaTextos(textos);
        this._adicionaQuestaoCorreta(respostas); 
        this._questoes.adiciona(this._criaQuestao(this._enunciado.value, resposta, this._opcoes.paraArray()));
        this._limpar();
    }

    finaliza(e){
        this.salva(e).then( () => {
            
            console.log(this._questoes);
            const request = {
                method : 'POST',
                body :  JSON.stringify({
                    nome : this._nome.value,
                    disciplina : this._disciplina.value,
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
                    // self._incrementaQuestao();
                    // self._limpar();
                    // self._verQuestoes.classList.remove('disabled');
                })
                .catch( (e) => { console.log(e)} );
    
            (function smoothscroll(){
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                     window.requestAnimationFrame(smoothscroll);
                     window.scrollTo (0,currentScroll - (currentScroll/5));
                }
            })();
        });
    }

    _criaOpcoesPadroes(){
        const quantidadePadrao = [1,2,3,4];

        quantidadePadrao.forEach( (opcoes) => {
            this._opcao = this._criaOpcao('', this._opcoes.letra(), false);
            this._opcoes.adiciona(this._opcao);
        });

        this._opcoesView.update(this._opcoes);
        this._adicionaEventoRemoverBotao();
    }

    _adicionaQuestaoCorreta(respostas){
        respostas.forEach( (input, indice) => {
            if(input.checked){
                this._opcoes.opcaoCorreta(indice);
            }  
        });
    }

    _adicionaTextos(textos){
        textos.forEach( (textarea, indice) => {
            this._opcoes.texto(textarea.value, indice);
        });
    }

    _adicionaEventoRemoverBotao() {
        const botaoRemoveOpcao = document.querySelectorAll(".botao-removeOpcao");
        botaoRemoveOpcao.forEach( (botaoRemove, indice) => {
            botaoRemove.addEventListener('click', this.removeOpcao.bind(this, botaoRemove, indice ));
        });
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
        M.textareaAutoResize(this._enunciado);
        this._opcoes.esvazia();
        this._criaOpcoesPadroes();
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