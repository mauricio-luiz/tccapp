class ExercicioView extends View{
    template(model){
        console.log(model); 
        return  `<div class="row" >
                    <div id="enunciado" class="col s12" >
                        <p>${model.enunciado}</p>
                    </div>
                </div>
                <div class="row" >
                    <div id="opcoes" class="col s12" >
                        ${model.opcoes.map( opcao =>
                            `<p>
                                <label>
                                    <input type="radio" name="opcao"   />
                                    <span>${opcao._texto}</span>
                                </label>
                            </p>`).join('')}
                    </div>
                </div>`;
    }    
}

