class Finalizados{

    constructor(){
        this._finalizados = [];
        Object.freeze(this);
    }

    adiciona(finalizados){
        this._finalizados.push(finalizados);
    }

    paraArray(){
        return [].concat(this._finalizados);
    }

    esvazia(){
        this._finalizados.length = 0;
    }
}