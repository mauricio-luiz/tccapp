class Mensagem{
    
    constructor(_texto, _cor){
        Object.assign( this, { _texto, _cor } );
        Object.freeze(this);
    }

    get texto(){
        return this._texto;
    }

    get cor(){
        return this._cor;
    }
}