class View{

    constructor(seletor){
        this._seletor = document.querySelector(seletor);
    }

    update(model){
        this._seletor.innerHTML = this.template(model);
    }

    incrementa(model){
        this._seletor.innerHTML += this.template(model);
    }
    
    template(model){
        throw new Error('Você precisa implementar o metodo template');
    }
}