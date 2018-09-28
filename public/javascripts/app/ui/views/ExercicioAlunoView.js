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
                        ${model.opcoes.map( (opcao, indice) =>
                            `<p>
                                <label>
                                    <input type="radio" name="opcao"  />
                                    <span>${opcao}</span>
                                </label>
                            </p>`).join('')}
                    </div>
                </div>`;
    }    
}

