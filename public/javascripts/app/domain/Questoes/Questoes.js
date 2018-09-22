class Questoes{

    constructor(){
        this._questoes = [];
        Object.freeze(this);
    }

    adiciona(questao){
        this._questoes.push(questao);
    }

    paraArray(){
        return [].concat(this._questoes);
    }

    esvazia(){
        this._questoes.length = 0;
    }

    tamanho(){
        return this._questoes.length;
    }
}