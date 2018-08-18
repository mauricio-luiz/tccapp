class Opcao{
    
    constructor(_texto, _campoNumero){
        this._texto = _texto;
        this._campoName = `opcao[${_campoNumero}]`;
        this._campoLabel = `Opção ${_campoNumero}`;
        this._placeholder = `Escreva aqui a opção ${_campoNumero}`;
        Object.freeze(this);
    }

    get texto(){
        return this._texto;
    }

    get name(){
        return this._campoName;
    }

    get label(){
        return this._campoLabel;
    }

    get placeholder(){
        return this._placeholder;
    }
}