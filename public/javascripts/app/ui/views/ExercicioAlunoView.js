class ExercicioAlunoView extends View{
    template(model){
        return  `
                <div class="row" >
                    <div id="enunciado" class="col s12" >
                        <p>${model.enunciado}</p>
                    </div>
                </div>
                <div class="row" >
                    <div id="opcoes" class="col s12" >
                        ${model.opcoes.map( (opcao, numero_opcao) =>
                            `<p>
                                <label>
                                    <input type="radio" name="opcao" value="${model.numero}&${numero_opcao}&${model.exercicioId}&${model.id}"  />
                                    <span>${opcao}</span>
                                </label>
                            </p>`).join('')}
                    </div>
                </div>`;
    }

    fim(){
        this._seletor.innerHTML = '<div>Fim</div>';
    }
    
    preloader(){
        this._seletor.innerHTML = `<div class="progress">
            <div class="indeterminate"></div>
        </div>`;
    }
}

