class AlunoController{

    constructor(quiz){
        const $ = document.querySelector.bind(document);
        this._url_responder = '/aluno/responder';
        this._url_salvar = '/aluno/salvar';
        this._alunoQuestoes = new AlunoQuestoes();
        this._exercicioView = new ExercicioAlunoView('#exercicio');
        this._responder = $('#responder');
        this._questaoAtual = $("#questaoAtual");
        this._quantidadeQuestao = $("#quantidadeQuestao");
        this._quiz = quiz;
    }

    adiciona(questoes){
        if(questoes.length == 0) return;

        questoes.forEach( (questao, indice) => {
            this._alunoQuestoes.adiciona(
                new AlunoQuestao(questao.enunciado, questao.correta, questao.opcoes, questao._id, this._quiz._id, indice )
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

        return await fetch(this._url_responder, request)
            .then( (response) => {
                return response.json( (json) => {
                    return json;
                });
            })
            .catch( (e) => { console.log(e)} );
    }

    async salva(dados){
        const { selecionado, acerto } = dados;
        
        const request = {
            method : 'POST',
            body :  JSON.stringify({
                selecionado : selecionado,
                acerto : acerto,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };

        return await fetch(this._url_salvar, request)
            .then( (response) => {
                return response.json( (json) => {
                    return json;
                });
            })
            .catch( (e) => { console.log(e) });
    }

    proximo(){
        this._exercicioView.preloader();
        const self = this;
        let proximo = parseInt(this._responder.getAttribute('data-proximo'));
            
        if(proximo < parseInt(this._quantidadeQuestao.textContent) ){
            setTimeout(function(){             
                    self._exercicioView.update(
                        self._alunoQuestoes.exercicio(proximo)
                    );
                    proximo = proximo + 1;
                    self._responder.setAttribute('data-proximo', proximo);
                    self._responder.classList= "waves-effect waves-light btn right left-20";
                    self._incrementaBadgeQuestaoAtual();    
                
            }, 2000);
        }else{
            self._exercicioView.fim();
        }
    }

    _incrementaBadgeQuestaoAtual(){
        this._questaoAtual.textContent = parseInt(this._questaoAtual.textContent) + 1;
    }
}