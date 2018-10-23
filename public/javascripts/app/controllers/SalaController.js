class SalaController{

    constructor(){       
        this._usuario = null;
        this._respostasView = new RespostasView("#resposta");
        this._finalizadosView = new FinalizadoView("#finalizado");
        this._salas = new Salas();
        this._finalizados = new Finalizados();        

        this._cardSalasView = new CardView("#cardSala");
        this._cardQuizzesView = new CardView("#cardQuiz");
        this._acoesSala = new AcoesSalaView("#acoesSala");
        this._acoesSala.update();
        this._cardResposta = document.querySelector("#cardResposta");
        this._cardFinalizado = document.querySelector("#cardFinalizado");
    }

    adicionaSalas(salas){
        this._cardSalas = new Card('cardSala', 'Escolha a sala', JSON.parse(salas) );
        this._cardSalasView.update(this._cardSalas);
    }

    adicionaQuizzes(quizzes){
        this._cardQuizzes = new Card('cardQuiz', 'Escolha o quiz', JSON.parse(quizzes));
        this._cardQuizzesView.update(this._cardQuizzes);

        this._sala = document.querySelector("#select-cardSala");
        this._quiz = document.querySelector("#select-cardQuiz");

        this._quiz.addEventListener('change', () => {
            if(this._quiz.value == "" && this._sala.value == "") return;
            this.prontoParaComecar();
        });
    }

    prontoParaComecar(quiz, sala){
        const iniciar = document.querySelector("#play");
        iniciar.classList.remove('disabled');
        iniciar.addEventListener("click", () => {
            this.iniciar();
        });
    }

    iniciar(){
        const iniciar   = document.querySelector("#play");
        const finalizar = document.querySelector("#stop");

        iniciar.outerHTML = "";
        finalizar.classList.remove("disabled");
        this._cardResposta.classList.remove("hide");
        this._cardFinalizado.classList.remove("hide");

        const request = {
            method : 'POST',
            body: JSON.stringify({
                    sala : this._sala.value,
                    quiz : this._quiz.value,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        const url = `/sala/iniciar`;
        fetch(url, request)
            .then( (response) => {
                if(response.ok === true){
                    return response.json().then( (json) => {
                        if (json.status === false) return;

                        const tabelaRespostasView = new TabelaRespostasView("#tabelaRespostas");
                        const tabelaFilizadosView = new TabelaFinalizadosView("#tabelaFilizados");
                        tabelaRespostasView.update(json.dados.quiz);
                        tabelaFilizadosView.update(json.dados.quiz);
                    });
                }
            })
            .catch( (e) => { console.log(e)} );
    }

    adiciona(aluno, quantidade_de_questao){
    
        if(this._salas.temAluno(aluno.email)) 
            return;
        
        const sala = this._criaSala(aluno.nome, aluno.email, quantidade_de_questao);
        this._salas.adiciona(sala);
        this._respostasView.adiciona(sala);
        const nA = document.querySelector('#nA');
        nA.classList = 'hide';
    }

    adicionaResposta(aluno, questao, resposta){
        this._aluno = aluno;
        this._questao = questao;
        this._resposta = resposta;
        this._respostasView.adicionaResposta(this._aluno, this._questao, this._resposta);
    }

    remove(aluno){
        this._salas.remove(aluno);
        const alunoLinha = document.querySelector(`tr[data-aluno="${aluno}"]`);

        if(alunoLinha !== null)
            alunoLinha.remove();
        
        if(this._salas.tamanho() == 0)
            nA.classList = '';
    }

    terminou(aluno, resultado){
        this._aluno = aluno;
        const { questoes } = resultado;
        
        console.log('questao', aluno, questoes);
        this._finalizados.adiciona( this._criaFinalizado(aluno, questoes) );
        console.log(this._finalizados);
        this._finalizadosView.update(this._finalizados);
    }

    _criaSala(aluno, email, quantidade_de_questao){
        return new Sala(aluno, email, quantidade_de_questao);
    }

    _criaFinalizado(aluno, questoes){
        return new Finalizado(aluno, questoes);
    }
}