class Questao{
    
    constructor(_enunciado, _resposta, _opcoes, _justificativa){
        this._enunciado = _enunciado.replace(/\n/g, '');
        this._resposta = _resposta;
        this._opcoes = _opcoes;
        this._justificativa = _justificativa.replace(/\n/g, '');
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