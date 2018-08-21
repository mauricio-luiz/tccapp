class OpcaoController{

    constructor(){
        const $ = document.querySelector.bind(document);
        this._opcoes = new Opcoes();
        this._opcoesView = new OpcoesView('#listaOpcoes');
    }

    adiciona(){
        this._opcoes.adiciona(this._criaOpcao("", this._opcoes.numero()));
        this._opcoesView.update(this._opcoes);
    }

    _criaOpcao(texto, numero){
        return new Opcao(
            texto,
            numero
        );
    }
}