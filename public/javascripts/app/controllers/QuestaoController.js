class QuestaoController{

    constructor(){  
        const $ = document.querySelector.bind(document);

        this._resposta = null;
        this._enunciado = $("#enunciado");
        this._disciplina = $('#disciplina');
        this._nome = $('#nome');
        this._quantidadeQuestao = $("#quantidadeQuestao");
        this._exercicio = $("#exercicio");
        this._verQuestoes = $("#verQuestoes");

        this._questoes = new Questoes();
        this._opcoes = new Opcoes();
        
        this._url = '/questao/salvar';
        this._find = '/questao/quiz/id/editar';
        this._create = '/quiz';
        this._edit = '/quiz/id/editar';       

        this._inicializeCollapse();
        if(! $('.collapsible li.active .collapsible-body .listaOpcoes')) return;
        
        this._opcoesView = new OpcoesView('.collapsible li.active .collapsible-body .listaOpcoes');
        this._criaOpcoesPadroes();    

        this._adicionaEventoSalvarECriarProxima();
        
        this._atualizaNumeroDeQuestoes();

        this._listaQuestao = new ListaQuestaoView("#mostraQuestoes");

    }

    _inicializeCollapse(){
        var elem = document.querySelector('#mostraQuestoes');
        var options = {
            onOpenStart : this.edita.bind(this)
        }
        this._collapse = M.Collapsible.init(elem, options);
    }

    cria(){
        const request = {
            method : 'POST',
            body :  JSON.stringify({
               _id : null
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };       
        fetch(this._create, request)
            .then( (response) => {
               response.json().then( (json) => {
                    const edit = this._edit.replace('id', json.quiz);
                    window.location.href = edit;
               });
            })
            .catch( (e) => { console.log(e)} );
    }

    adicionaOpcao(){
        const respostas = document.querySelectorAll(".collapsible li.active .collapsible-body .listaOpcoes input[type=radio]");
        const textos = document.querySelectorAll(".collapsible li.active .collapsible-body .listaOpcoes textarea");
        this._adicionaTextos(textos);
        this._adicionaQuestaoCorreta(respostas);
        
        this._opcao = this._criaOpcao('', this._opcoes.letra(), false);
        this._opcoes.adiciona(this._opcao);

        this._opcoesView.update(this._opcoes);
        this._opcoesView.updateTextarea(this._opcoes);
        this._adicionaEventoRemoverBotao();
    }

    removeOpcao(botao, indice){
        const resposta = document.querySelector(".collapsible li.active .collapsible-body .listaOpcoes input[type=radio]:checked");             
        this._opcoes.remove(indice);
        this._opcoesView.refresh(this._opcoes);
        this._adicionaEventoRemoverBotao();

        const nova_resposta = document.querySelector(`.collapsible li.active .collapsible-body .listaOpcoes input[type="radio"][value="${resposta.value}"]`);
        if(nova_resposta) nova_resposta.checked = true;
    }

    async salva(e){
        e.preventDefault();
        const resposta = document.querySelector(".collapsible li.active .collapsible-body .listaOpcoes input[type=radio]:checked").value;
        const respostas = document.querySelectorAll(".collapsible li.active .collapsible-body .listaOpcoes input[type=radio]");
        const textos = document.querySelectorAll(".collapsible li.active .collapsible-body .listaOpcoes textarea");
        const id = document.querySelector("#quizID");
        this._adicionaTextos(textos);
        this._adicionaQuestaoCorreta(respostas); 
        this._enunciado = $("#enunciado");
        
        const questao = this._criaQuestao(this._enunciado.value, resposta, this._opcoes.paraArray());
        const request = {
            method : 'POST',
            body :  JSON.stringify({
                id : id.value,
                questao : questao
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        
        fetch(this._url, request)
            .then( async (response) => {
               return await response.json().then( (json) => {
                    this._questoes.adiciona(questao);
                    this._listaQuestao.update(json.quiz);
                    this._collapse.destroy();
               });
            }).then( async () => {
                this._opcoesView = new OpcoesView('.collapsible li.active .collapsible-body .listaOpcoes');
                this._criaOpcoesPadroes();
                this._atualizaNumeroDeQuestoes();
                this._inicializeCollapse();
                this._adicionaEventoAdicionaOpcoes();
                this._adicionaEventoSalvarECriarProxima();
            })
            .catch( (e) => { console.log(e)} );
        
        this._limpar();
    }

    edita(obj){
        const dados = obj.getAttribute('data-questao');
        if( ! dados ) {
            this._opcoes.esvazia();
            this._criaOpcoesPadroes();
            return;
        }

        const dadosQuestao = dados.split("&");

        const id = dadosQuestao.shift();
        const quiz = dadosQuestao.shift();
        const url = this._find.replace('quiz', quiz).replace('id', id).trim();

        const request = {
            method : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        fetch(url, request)
            .then( (response) => {
               return response.json().then( (json) => {
                    const editarQuestaoView = new EditarQuestaoView('.collapsible li.active .collapsible-body');
                    editarQuestaoView.update(json.questao);
                    editarQuestaoView.updateTextarea(json.questao);
                    return json.questao;
               });
            }).then( (questao) => {
                this._opcoesView = new OpcoesView('.collapsible li.active .collapsible-body .listaOpcoes');
                this._opcoes.esvazia();
                questao.opcoes.forEach( (opcao) => this._opcoes.adiciona( this._criaOpcao(opcao._texto, this._opcoes.letra(), opcao._correta)));
                this._opcoesView.update(this._opcoes);              
                this._adicionaEventoEditarAdicionarOpcao();
                
                const btnAtualizar = document.querySelector(".collapsible li.active .collapsible-body .editar-questao");
                btnAtualizar.addEventListener('click', () => {
                    this.atualizar(questao);
                });
            })
            .catch( (e) => { console.log(e)} );
    }

    atualizar(dados){

        const resposta = document.querySelector(".collapsible li.active .collapsible-body .listaOpcoes input[type=radio]:checked").value;
        const respostas = document.querySelectorAll(".collapsible li.active .collapsible-body .listaOpcoes input[type=radio]");
        const textos = document.querySelectorAll(".collapsible li.active .collapsible-body .listaOpcoes textarea");
        const id = document.querySelector("#quizID");
        this._adicionaTextos(textos);
        this._adicionaQuestaoCorreta(respostas); 
        const enunciado = document.querySelector(".collapsible li.active .collapsible-body .enunciado-edit");

        

        const questao = this._criaQuestao(enunciado.value, resposta, this._opcoes.paraArray());       
        const request = {
            method : 'POST',
            body: JSON.stringify({
                    id : id.value,
                    questao : questao,
                    id_questao : dados._id
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };
        const url = `/questao/atualizar`;
        fetch(url, request)
            .then( (response) => {                
                return response.json().then( (json) => {
                    const li = document.querySelectorAll('.collapsible li');
                    const enunciado = document.querySelector('.collapsible li.active .question');
                    let selecionado = 0;
                    Array.from(li).filter( (elemento, index) => { 
                        if(elemento.classList.contains('active')){
                            selecionado = index;
                        }
                    });                
                    this._collapse.close(selecionado);                    
                    enunciado.innerHTML = `<span class="question"><b class="font-20">#${selecionado+1}</b> ${json.quiz.questoes[selecionado].enunciado}</span>`;
                });
                
            })
            .catch( (e) => { console.log(e)} );
    }
    
    _adicionaEventoEditarAdicionarOpcao(){
        const editAdicionaOpcao = $('.collapsible li.active .collapsible-body .edit-adicionar-opcao');
        editAdicionaOpcao.addEventListener('click', (event) => {
            this.adicionaOpcao();
        });
    }

    _adicionaEventoSalvarECriarProxima(){
        this._salvaECriaProxima = document.querySelector("#salvaECriaProxima");
        this._salvaECriaProxima
        .addEventListener('click', this.salva.bind(this));
    }

    _criaOpcoesPadroes(){
        const quantidadePadrao = [1,2,3,4];

        quantidadePadrao.forEach( (opcoes) => {
            this._opcao = this._criaOpcao('', this._opcoes.letra(), false);
            this._opcoes.adiciona(this._opcao);
        });
        this._opcoesView = new OpcoesView('.collapsible li.padrao .collapsible-body .listaOpcoes');
        this._opcoesView.update(this._opcoes);
        this._adicionaEventoRemoverBotao();
    }

    _adicionaQuestaoCorreta(respostas){
        respostas.forEach( (input, indice) => {
            if(input.checked){
                this._opcoes.opcaoCorreta(indice);
            }else{
                this._opcoes.removeCorreta(indice);
            }
        });
    }

    _adicionaTextos(textos){
        textos.forEach( (textarea, indice) => {
            this._opcoes.texto(textarea.value, indice);
        });
    }

    _adicionaEventoRemoverBotao() {
        const botaoRemoveOpcao = document.querySelectorAll(".botao-removeOpcao");
        botaoRemoveOpcao.forEach( (botaoRemove, indice) => {
            botaoRemove.addEventListener('click', this.removeOpcao.bind(this, botaoRemove, indice ));
        });
    }

    _adicionaEventoAdicionaOpcoes(){
        const btnAdicionaOpcao = document.querySelector("#botao-adicionaOpcao");       
        btnAdicionaOpcao.addEventListener('click', this.adicionaOpcao.bind(this));
    }

    _criaQuestao(enunciado, resposta, opcoes){
        return new Questao(
            enunciado,
            resposta,
            opcoes
        );
    }

    _criaOpcao(texto, numero, correta){
        return new Opcao(
            texto,
            numero,
            correta
        );
    }

    _limpar(){
        this._enunciado.value = "";
        M.textareaAutoResize(this._enunciado);
        this._opcoes.esvazia();
    }    

    _respostaCorrente(){
        let respostas = document.querySelectorAll(".collapsible li.active .collapsible-body .listaOpcoes input[type=radio]");
        let resposta = null;
        respostas.forEach( (input, indice) => {
            if(input.checked)   resposta = indice;
        });
        return resposta;
    }

    _atualizaNumeroDeQuestoes(){
        const textoNumeroQuestao = document.querySelector("#numeroQuestao");
        const numeroQuestao = document.querySelectorAll('.collapsible li').length;
        textoNumeroQuestao.innerHTML = numeroQuestao;
    }

}