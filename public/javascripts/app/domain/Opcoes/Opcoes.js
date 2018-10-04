class Opcoes{

    constructor(){
        this._opcoes = [];
        Object.freeze(this);
    }

    adiciona(opcao){
        this._opcoes.push(opcao);
        console.log(this._opcoes);
    }

    paraArray(){
        return [].concat(this._opcoes);
    }

    esvazia(){
        this._opcoes.length = 0;
    }

    tamanho(){
        return this._opcoes.length;
    }

    letra(){
        return this._converteLetra((this._opcoes.length));
    }

    _converteLetra(numero){
        const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'X', 'W', 'Y', 'Z'];
        return alfabeto[numero] ;
    }
}