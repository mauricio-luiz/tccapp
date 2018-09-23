class Exercicios{

    constructor(){
        this._exercicios = [];
        Object.freeze(this);
    }

    adiciona(exercicio){
        this._exercicios.push(exercicio);
    }

    paraArray(){
        return [].concat(this._exercicios);
    }

    exercicio(numero){
        return [].concat(this._exercicios)[numero];
    }

    esvazia(){
        this._opcoes.length = 0;
    }
}