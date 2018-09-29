class SalaController{

    constructor(){       
        this._usuario = null;
        this._respostasView = new RespostasView("#resposta");
        this._salas = new Salas();
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

    adicionaResposta(aluno = '', questao = '', resposta = ''){
        this._aluno = 'luiz@gmail.com';
        this._questao = 1;
        this._resposta = 1;

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

    _criaSala(aluno, email, quantidade_de_questao){
        return new Sala(aluno, email, quantidade_de_questao);
    }
}