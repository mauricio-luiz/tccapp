class ExercicioController{

    constructor(){
        const $ = document.querySelector.bind(document);
        this._exercicios = new Exercicios();
        this._exercicioView = new ExercicioView("#exercicio");
        this._proximo = $("#proximo");
        this._anterior = $("#anterior");
        this._quantidadeQuestao = $("#quantidadeQuestao");
        this._questaoAtual = $("#questaoAtual");
    }

    adiciona(questoes){
        if(questoes.length == 0) return;

        questoes.forEach(questao => {            
            this._exercicios.adiciona(
                new Questao(questao.questao, questao.correta, questao.opcoes, questao._id, questao.exercicio )
            );    
        });

        this._exercicioView.update(this._exercicios.exercicio(0));
         
        const self = this;
        this._proximo.addEventListener('click', () => self.proximo() );
        this._anterior.addEventListener('click', () => self.anterior() );
    }

    proximo(){
        const atual    = parseInt(this._proximo.getAttribute('data-proximo'));
        const proximo  = parseInt(this._proximo.getAttribute('data-proximo')) + 1;
        const anterior = proximo - 2;
        
        this._exercicioView.update(this._exercicios.exercicio(atual));
        this._atualizaProximo(proximo);
        this._anterior.classList.remove('disabled');
        this._atualizaAnterior(anterior);
        this._incrementaBadgeQuestaoAtual();
        
        if(proximo >= parseInt(this._quantidadeQuestao.textContent))
            this._proximo.classList.add('disabled');
    }

    anterior(){
        const atual  = parseInt(this._proximo.getAttribute('data-proximo')) - 2;
        const anterior = parseInt(this._anterior.getAttribute('data-anterior')) - 1;
        const proximo = atual + 1;
        
        this._exercicioView.update(this._exercicios.exercicio(atual));
        this._atualizaProximo(proximo);
        this._atualizaAnterior(anterior);
        this._proximo.classList.remove('disabled');
        this._decrementaBadgeQuestaoAtual();

        if(atual <= 0){
            this._anterior.classList.add('disabled');
        }
    }

    _atualizaProximo(valor){        
        this._proximo.setAttribute('data-proximo', valor);
    }

    _atualizaAnterior(valor){
        this._anterior.setAttribute('data-anterior', valor);
    }

    _incrementaBadgeQuestaoAtual(){
        this._questaoAtual.textContent = parseInt(this._questaoAtual.textContent) + 1;
    }

    _decrementaBadgeQuestaoAtual(){
        this._questaoAtual.textContent = parseInt(this._questaoAtual.textContent) - 1;
    }
}