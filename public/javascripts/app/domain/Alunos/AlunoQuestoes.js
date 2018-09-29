class AlunoQuestoes{

    constructor(){
        this._alunoQuestoes = [];
        Object.freeze(this);
    }

    adiciona(alunoQuestao){
        this._alunoQuestoes.push(alunoQuestao);
    }

    paraArray(){
        return [].concat(this._alunoQuestoes);
    }

    exercicio(numero){
        return [].concat(this._alunoQuestoes)[numero];
    }

    esvazia(){
        this._opcoes.length = 0;
    }
}