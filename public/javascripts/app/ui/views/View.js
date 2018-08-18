class View{

    constructor(seletor){
        this._seletor = document.querySelector(seletor);
    }

    nova(model){
        console.log(this._seletor);
        this._seletor.innerHTML = this.textareaTemplate(model);
    }

    update(model){
        this._seletor.innerHtml = this.template(model);
    }
    
    template(model){
        throw new Error('Você precisa implementar o metodo template');
    }
}