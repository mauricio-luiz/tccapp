class Opcoes{

    constructor(){
        this._opcoes = [];
        Object.freeze(this);
    }

    adiciona(opcao){
        this._opcoes.push(opcao);
    }

    paraArray(){
        return [].concat(this._opcoes);
    }

    esvazia(){
        this._opcoes.length = 0;
    }

    remove(valor){
        let opcaoArray =  [].concat(this._opcoes);
        opcaoArray = opcaoArray.filter( (item, indice) =>{
            return indice !== valor;
        });
        this.esvazia();
        opcaoArray.forEach( (opcao) => {
            let texto = document.querySelector(`#${opcao.id}`);
            let nova = new Opcao(texto.value, this.letra(), false);
            this.adiciona(nova);
        });
    }

    tamanho(){
        return this._opcoes.length;
    }

    letra(){
        return this._converteLetra((this._opcoes.length));
    }

    opcaoCorreta(indice){
        [].concat(this._opcoes)[indice].correta = true;
    }

    texto(texto, indice){
        [].concat(this._opcoes)[indice].texto = texto;
    }

    _converteLetra(numero){
        const alfabeto = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'X', 'W', 'Y', 'Z'];
        return alfabeto[numero] ;
    }
}