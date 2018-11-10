class ExercicioAlunoView extends View{
    template(model){
        console.log(model);
        return  `
        <div class="row">
            <div class="col s12">
                <div class="card">
                    <div class="card-content">          
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
                                            <input type="radio" name="opcao" value="${numero_opcao}&${opcao._id}&${model.quiz}&${model._id}"  />
                                            <span>${opcao._texto}</span>
                                        </label>
                                    </p>`).join('')}
                            </div>
                        </div>
                    </div>       
                </div>
            </div>
        </div>`;
    }

    fim(){
        this._seletor.innerHTML = `<section>
            <h1><div class="loading">Gerando resultado</div></h1>
        </section>`;
    }
    
    preloader(){
        this._seletor.innerHTML = `<div class="progress">
            <div class="indeterminate"></div>
        </div>`;
    }
}

