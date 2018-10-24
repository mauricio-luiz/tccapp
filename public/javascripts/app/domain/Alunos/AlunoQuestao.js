class AlunoQuestao{
    
    constructor(_enunciado, _resposta, _opcoes, _id = null, _quiz, _numero){
        Object.assign(this, {_enunciado, _resposta, _opcoes, _id, _quiz, _numero});
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

    get quiz(){
        return this._quiz;
    }

    get numero(){
        return this._numero;
    }
}