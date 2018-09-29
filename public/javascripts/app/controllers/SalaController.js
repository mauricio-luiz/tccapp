class SalaController{

    constructor(){
        this._salas = new Salas();
        this._usuario = null;
        this._respostasView = new RespostasView("#resposta");
    }

    adiciona(aluno, professor, quantidade_de_questao){
        this._usuario = professor;

        if(aluno.email == this._usuario)
            return;
        
        this._salas.adiciona(this._criaSala(aluno.nome, aluno.email, quantidade_de_questao));
        this._respostasView.update(this._salas);
        console.log(this._salas);
    }

    remove(aluno){
        this._salas.remove(aluno);
        const alunoLinha = document.querySelector(`tr[data-aluno="${aluno}"]`);
        alunoLinha.remove();
    }

    _criaSala(aluno, email, quantidade_de_questao){
        return new Sala(aluno, email, quantidade_de_questao);
    }
}