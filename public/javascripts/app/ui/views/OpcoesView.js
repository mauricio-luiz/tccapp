class OpcoesView extends View{

    template(model){
        return  `${model.paraArray().map( opcao =>
                        `<div class="row" >
                            <div class="valign-wrapper" >
                                <div class="input-field col s8">
                                    <textarea  class="materialize-textarea" name="enunciado[opcoes][]" id="${opcao.id}" >${opcao.texto}</textarea>
                                    <label for="${opcao.name}" class="active">${opcao.label}</label>
                                </div>
                                <div class="col s4">
                                    <label >
                                        <input class="with-gap" name="enunciado[resposta]" type="radio" value="${opcao.id}" />
                                        <span>Resposta Correta?</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        `).join('')}
                   `;
                
    }

    updateTextarea(model){
        model.paraArray().map( opcao => {
            M.textareaAutoResize(document.querySelector(`#${opcao.id}`));
        });
    }
}