class View{

    constructor(seletor){
        this._seletor = document.querySelector(seletor);
    }

    update(model){
        console.log(this._seletor);
        this._seletor.innerHTML = this.template(model);
    }
    
    template(model){
        throw new Error('Você precisa implementar o metodo template');
    }
}