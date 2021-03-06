class OpcoesView extends View{

    template(model){
        return  `${model.paraArray().map( opcao =>
            `
            <div class="row" >
                <div class="valign-wrapper" >
                    <div class="input-field col s9">
                        <textarea  class="materialize-textarea" name="questao[opcoes][]" id="${opcao.id}" >${opcao.texto}</textarea>
                        <label for="${opcao.name}" class="active">${opcao.label}</label>
                    </div>
                    <div class="col s12 m3">
                        <button type="button" class="btn-flat waves-effect waves-light red-text small top-10 botao-removeOpcao" value="${opcao.id}" ><i class="material-icons" >delete</i></button>
                        <label class="right top-15">
                            <input class="with-gap" name="questao[resposta]" type="radio" value="${opcao.id}"  ${ opcao.correta == true ? 'checked' : '' } />
                            <span><span class="hide-on-med-and-down">Resposta</span> Correta?</span>
                        </label>
                    </div>
                </div>
            </div>                    
            `).join('')}
        `;
    }

    refresh(model){
        this.update(model);
    }

    updateTextarea(model){
        model.paraArray().map( opcao => {
            M.textareaAutoResize(document.querySelector(`#${opcao.id}`));
        });
    }

    updateResposta(model, resposta){
        const respostas = document.querySelectorAll("#listaOpcoes input[type=radio]");
        respostas.forEach( (opcao, indice) =>  {
            if(resposta == indice) opcao.setAttribute('checked', true);
        });
    }
}