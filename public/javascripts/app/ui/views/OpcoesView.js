class OpcoesView extends View{

    template(model){
        return  `<div>
                    ${model.paraArray().map( opcao =>
                        `
                            <label for="${opcao.name}">${opcao.label}</label>
                            <br>
                            <textarea rows="3" cols="100" name="${opcao.name}" placeholder="${opcao.placeholder}"  >${opcao.texto}</textarea><br>
                        `).join('')}
                </div>`;
                
    }
}