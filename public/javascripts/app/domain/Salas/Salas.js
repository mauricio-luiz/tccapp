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
            if(aluno.email == email){
                delete this._salas[indice];
                this._salas.length = this._salas.length - 1;
            }
        });
        console.log(this._salas);
    }
}