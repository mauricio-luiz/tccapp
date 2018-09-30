class AlunoQuestao{
    
    constructor(_enunciado, _resposta, _opcoes, _id = null, _exercicioId = null, _numero){
        Object.assign(this, {_enunciado, _resposta, _opcoes, _id, _exercicioId, _numero});
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

    get id(){
        return this._id;
    }

    get exercicioId(){
        return this._exercicioId;
    }

    get numero(){
        return this._numero;
    }
}