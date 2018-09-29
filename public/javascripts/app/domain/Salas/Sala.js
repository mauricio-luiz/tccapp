class Sala {

    constructor(_aluno, _email, _quantidade_resposta, _respostas = []){
        Object.assign(this, {_aluno, _email, _quantidade_resposta});
        
        this._respostas = _respostas;
        if(_respostas.length == 0){
            for(let i = 0; i < _quantidade_resposta; i++)
                this._respostas.push('-');
        }

        Object.freeze(this);
    }

    get aluno(){
        return this._aluno;
    }

    get email(){
        return this._email;
    }

    get quantidade_resposta(){
        return this._quantidade_resposta;
    }

    get respostas(){
        return this._respostas;
    }
}