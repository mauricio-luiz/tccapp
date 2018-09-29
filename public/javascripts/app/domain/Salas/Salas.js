class Salas{

    constructor(){
        this._salas = [];
        Object.freeze(this);
    }

    adiciona(sala){
        this._salas.push(sala);
    }

    paraArray(){
        return [].concat(this._salas);
    }

    esvazia(){
        this._salas.length = 0;
    }

    remove(email){
        this._salas.map( (aluno,indice) => {            
            if(aluno.email == email && typeof this._salas[indice] != null){
                delete this._salas[indice];
                this._salas.length = this._salas.length - 1;
            }
        });       
    }

    tamanho(){
        return this._salas.length;
    }

    temAluno(email){
        let achei = false;
        this._salas.forEach( (aluno,indice) => { 
            if(aluno.email == email){
                achei = true;
            }
        });
        return achei;
    }
}