class OpcaoController{

    constructor(){
        const $ = document.querySelector.bind(document);
        this._opcoes = new Opcoes();
        this._opcoesView = new OpcoesView('#listaOpcoes');
        this._texto = $("#opcao");
    }

    adiciona(){

        let resposta = null;
        if(this._opcoes.tamanho() > 0){
            resposta = this._resposta();     
        }

        this._opcao = this._criaOpcao(this._texto.value, this._opcoes.letra(), resposta);
        this._opcoes.adiciona(this._opcao);
        this._opcoesView.update(this._opcoes);
        this._opcoesView.updateTextarea(this._opcoes);
        this._opcoesView.updateResposta(this._opcoes, resposta);
        this._limpar();
        this._limparOpcoes();
    }

    adicionaOpcao( listaOpcoes, correta ){
        if(listaOpcoes.length == 0) return;
      
        const self = this;
        listaOpcoes.forEach( (opcao, indice) => {
            let resposta =  correta == indice ? true : false;
            self._opcao = self._criaOpcao(opcao, self._opcoes.letra(), resposta);
            self._opcoes.adiciona(self._opcao);
            self._opcoesView.update(self._opcoes);
            self._opcoesView.updateTextarea(self._opcoes);        
        });
    }

    opcoes(){
        return this._opcoes;
    }

    _limparOpcoes(){
        this._opcoes.esvazia();
    }

    _criaOpcao(texto, numero, correta){
        return new Opcao(
            texto,
            numero,
            correta
        );
    }

    _limpar(){
        this._texto.value = "";
        M.textareaAutoResize(this._texto);
    }

    _incrementaQuestao(){
        this._quantidadeQuestao.textContent =  parseInt(this._quantidadeQuestao.textContent) + 1;
        this._quantidadeQuestao.classList = "new badge pulse";
        self = this;
        setTimeout(function(){ self._quantidadeQuestao.classList = "new badge"; }, 10000);
    }
}