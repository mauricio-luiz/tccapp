class Opcoes{

    constructor(){
        this._opcoes = [];
        Object.freeze(this);
    }

    adiciona(opcao){
        this._opcoes.push(opcao);
    }

    paraArray(){
        return [].concat(this._opcoes);
    }

    esvazia(){
        this._opcoes.length = 0;
    }

    numero(){
        return (this._opcoes.length + 1);
    }
}