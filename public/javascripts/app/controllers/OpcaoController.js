class OpcaoController{

    constructor(){
        const $ = document.querySelector.bind(document);
        this._opcoes = new Opcoes();
        this._opcoesView = new OpcoesView('#listaOpcoes');
        this._texto = $("#opcao");
    }

    adiciona(){
        this._opcao = this._criaOpcao(this._texto.value, this._opcoes.letra());
        this._opcoes.adiciona(this._opcao);
        this._opcoesView.update(this._opcoes);
        this._opcoesView.updateTextarea(this._opcoes);
        this._limpar();
    }

    opcoes(){
        console.log(this);
        return this._opcoes;
    }

    limparOpcoes(){
        this._opcoes.esvazia();
    }

    _criaOpcao(texto, numero){
        return new Opcao(
            texto,
            numero
        );
    }

    _limpar(){
        this._texto.value = "";
        M.textareaAutoResize(this._texto);
    }
}