class Card{

    constructor(_id, _titulo, _dados){
        Object.assign(this, { _id, _titulo, _dados});
        Object.freeze(this);
    }

    get id(){
        return this._id;
    }

    get titulo(){
        return this._titulo;
    }

    get dados(){
        return this._dados;
    }
}