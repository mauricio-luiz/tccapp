class Questao{
    
    constructor(_enunciado, _resposta, _opcoes, _justificativa){
        Object.assign(this, {_enunciado, _resposta, _opcoes, _justificativa});
        Object.freeze(this);
    }

    get enunciado(){
        return this._enunciado;
    }

    get resposta(){
        return this._resposta;
    }

    get opcoes(){
        return this._opcoes;
    }

    get justificativa(){
        return this._justificativa;
    }
}