class ExercicioView extends View{
    template(model){
        console.log(model);
        return  `
                <div class="row">
                    <div class="col s12" >                        
                        <form action="/questao/${model.exercicioId}/remover/${model.id}/questao?_method=delete" method="post" >
                            <a href="/questao/${model.exercicioId}/editar/${model.id}/questao" class="waves-effect waves-light btn grey btn-small"><i class="material-icons left">edit</i>Editar Questão</a>
                            <button href="" class="waves-effect waves-light btn red lighten-2 btn-small" type="submit"><i class="material-icons left">delete_forever</i>Excluir Questão</button>
                        </form>
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

