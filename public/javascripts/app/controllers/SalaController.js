class SalaController{

    constructor(socket){       
        this._usuario = null;
        this._salas = new Salas();
        this._finalizados = new Finalizados();        

        this._cardSalasView = new CardView("#cardSala");
        this._cardQuizzesView = new CardView("#cardQuiz");
        this._acoesSala = new AcoesSalaView("#acoesSala");
        this._acoesSala.update();
        this._cardResposta = document.querySelector("#cardResposta");
        this._cardFinalizado = document.querySelector("#cardFinalizado");

        this._socket = socket;
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
            this.iniciar(this._sala.value,  this._quiz.value);
        });
    }

    reinicia(salaEscolhida){
        const sala = JSON.parse(salaEscolhida);
        const idsala = sala._id;
        const idquiz = sala.quiz._id;

        this._sala = document.querySelector("#select-cardSala");
        this._quiz = document.querySelector("#select-cardQuiz");

        this._sala.value = idsala;
        this._quiz.value = idquiz;

        this.iniciar(idsala, idquiz);
    }

    iniciar(sala, quiz){
        const iniciar   = document.querySelector("#play");
        const finalizar = document.querySelector("#stop");

        iniciar.outerHTML = "";
        finalizar.classList.remove("disabled");
        this._cardResposta.classList.remove("hide");
        this._cardFinalizado.classList.remove("hide");

        const request = {
            method : 'POST',
            body: JSON.stringify({
                    sala : sala ,
                    quiz : quiz,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        const url = `/sala/iniciar`;
        fetch(url, request)
            .then( async (response) => {
                if(response.ok === true){
                    return await response.json().then( async (json) => {
                        if (json.status === false) return;

                        const tabelaRespostasView = new TabelaRespostasView("#tabelaRespostas");
                        const tabelaFilizadosView = new TabelaFinalizadosView("#tabelaFilizados");
                        tabelaRespostasView.update(json.dados.quiz);
                        tabelaFilizadosView.update(json.dados.quiz);
                        this._sala.disabled = true;
                        this._quiz.disabled = true;
                        let elems = document.querySelectorAll('select');
                        let instances = M.FormSelect.init(elems, []);
                        
                        const codigoDaSala = document.querySelector("#codigoDaSala");
                        codigoDaSala.innerHTML = json.dados.codigo;
                        this._socket.emit('create-room', json.dados._id);
                        return json;
                    });
                }
            }).then((json) => {
                console.log('json 1', json);
                finalizar.addEventListener('click', () => {
                    window.location.href = `/sala/${json.dados._id}/finalizar`;
                });
            })
            .catch( (e) => { console.log(e)} );
    }

    adiciona(aluno, quantidade_de_questao){
    
        if(this._salas.temAluno(aluno.email)) 
            return;
        
        this._respostasView = new RespostasView("#resposta");
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
        
        this._finalizadosView = new FinalizadoView("#finalizado");
        this._finalizados.adiciona( this._criaFinalizado(aluno, questoes) );
        this._finalizadosView.update(this._finalizados);
    }

    _criaSala(aluno, email, quantidade_de_questao){
        return new Sala(aluno, email, quantidade_de_questao);
    }

    _criaFinalizado(aluno, questoes){
        return new Finalizado(aluno, questoes);
    }
}