class Finalizado{
    
    constructor(_aluno,  _questoes = []){
        Object.assign(this, {_aluno, _questoes});
        Object.freeze(this);
    }

    get aluno(){
        return this._aluno;
    }

    get questoes(){
        return this._questoes;
    }
}