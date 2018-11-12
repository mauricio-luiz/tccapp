class EditarQuestaoView extends View{

    template(model){
        return `
            <div id="template_exercicio">
                <div class="row" >
                    <div class="input-field col s12">
                        <textarea id="enunciado-edit" name="edit[enunciado]" class="materialize-textarea enunciado-edit">${model.enunciado}</textarea>
                        <label for="enunciado-edit" class="active">Enunciado</label>
                    </div>
                </div>
                <div class="row" >
                    <div class="col s12 listaOpcoes" >
                    </div>            
                <div>
                <div class="row">
                    <div class="input-field col s12" >
                        <textarea id="justificativa-edit" name="questao[justificativa]" class="materialize-textarea justificativa-edit" >${model.justificativa}</textarea>
                        <label for="justificativa-edit" class="active">Justificativa da Questão (Feedback para o aluno)</label>
                    </div>
                </div>
                <div class="row" >
                    <div class="col s12" >
                        <button type="submit" class="btn waves-effect waves-light right btn-small editar-questao" >
                            <i class="material-icons left" >save</i>Salvar
                        </button>
                        <button type="submit" class="btn waves-effect waves-light right btn-small right-20 edit-adicionar-opcao" >
                            <i class="material-icons left" >add</i>Adicionar Opção
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    updateTextarea(model){
        const enunciado = document.querySelector("#enunciado-edit");
        const justificativa = document.querySelector("#justificativa-edit");

        setTimeout( () => {
            M.textareaAutoResize(enunciado);
            M.textareaAutoResize(justificativa);
            model.opcoes.map( opcao => {   
                M.textareaAutoResize(document.querySelector(`#${opcao._id}`));
            });
        },1000);
        
    }
}