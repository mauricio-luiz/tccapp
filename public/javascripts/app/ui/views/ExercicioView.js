class ExercicioView extends View{
    template(model){
        console.log(model);
        return  `
                <div class="row">
                    <div class="col s12" >
                        <a href="/questao/${model.exercicioId}/editar/${model.id}/questao" class="waves-effect waves-light btn grey btn-small"><i class="material-icons left">edit</i>Editar Questão</a>
                    </div>
                </div>
                <div class="row" >
                    <div id="enunciado" class="col s12" >
                        <p>${model.enunciado}</p>
                    </div>
                </div>
                <div class="row" >
                    <div id="opcoes" class="col s12" >
                        ${model.opcoes.map( (opcao, indice) =>
                            `<p>
                                <label>
                                    <input type="radio" name="opcao" ${model.resposta == indice ? 'checked' : ''} disabled  />
                                    <span>${opcao}</span>
                                </label>
                            </p>`).join('')}
                    </div>
                </div>`;
    }    
}

