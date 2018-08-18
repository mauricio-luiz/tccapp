class OpcoesView extends View{

    textareaTemplate(model){
        return  `<div>
                    ${model.paraArray().map( opcao =>
                        `
                            <label for="${opcao.name}">${opcao.label}</label>
                            <br>
                            <textarea rows="3" cols="100" name="${opcao.name}" placeholder="${opcao.placeholder}"  draggable="false">${opcao.texto}</textarea><br>
                        `).join('')}
                </div>`;
                
    }

    template(){
        
    }
}