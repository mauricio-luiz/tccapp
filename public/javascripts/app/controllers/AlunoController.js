class AlunoController{

    constructor(){
        const $ = document.querySelector.bind(document);
        this._url = '/aluno/responder';
        this._alunoQuestoes = new AlunoQuestoes();
        this._exercicioView = new ExercicioAlunoView('#exercicio');
        this._responder = $('#responder');
        this._questaoAtual = $("#questaoAtual");
    }

    adiciona(questoes){
        if(questoes.length == 0) return;

        questoes.forEach( (questao, indice) => {
            this._alunoQuestoes.adiciona(
                new AlunoQuestao(questao.questao, questao.correta, questao.opcoes, questao._id, questao.exercicio, indice )
            );    
        });

        this._exercicioView.update(this._alunoQuestoes.exercicio(0));
    }

    async reponder( resposta ){
        
        const request = {
            method : 'POST',
            body :  JSON.stringify({
                resposta : resposta
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };

        return await fetch(this._url, request)
            .then( (response) => {
                return response.json( (json) => {
                    return json;
                });
            })
            .catch( (e) => { console.log(e)} );
    }

    proximo(){
        this._exercicioView.preloader();
        const self = this;
        let proximo = parseInt(this._responder.getAttribute('data-proximo'));
        setTimeout(function(){ 
            self._exercicioView.update(
                self._alunoQuestoes.exercicio(proximo)
            );
            proximo = proximo + 1;
            self._responder.setAttribute('data-proximo', proximo);
            self._responder.classList= "waves-effect waves-light btn right left-20";
            self._incrementaBadgeQuestaoAtual();
         }, 2000);
    }

    _incrementaBadgeQuestaoAtual(){
        this._questaoAtual.textContent = parseInt(this._questaoAtual.textContent) + 1;
    }
}