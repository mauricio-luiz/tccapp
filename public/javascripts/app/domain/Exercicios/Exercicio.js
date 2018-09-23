class Exercicio{

    constructor(_enunciado, _opcoes, _resposta){
        Object.assign(this, { _enunciado, _opcoes, _resposta});
        Object.freeze(this);
    }

    get enunciado(){
        return this._enunciado;
    }

    get opcoes(){
        return this._opcoes;
    }

    get resposta(){
        return this._resposta;
    }
}