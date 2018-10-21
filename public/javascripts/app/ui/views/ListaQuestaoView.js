class ListaQuestaoView extends View{

    template(model){       
        return `${model.questoes.map( (questao, numero) =>
         `
            <li data-questao="${questao._id}&${model._id}">
                <div class="collapsible-header"><i class="material-icons">edit</i>
                    <span class="question"><b class="font-20">#${numero+1}</b> ${questao.enunciado}</span>
                    <form class="rigth" action="/questao/${questao._id}&${model._id}?_method=delete" method="post" >
                        <button type="submit" class="btn-flat red-text waves-effect waves-light top-negative-9 right-collapse" >
                            <i class="material-icons" >delete</i>
                        </button>
                    </form>
                </div>
            <div class="collapsible-body"><span></span></div>
        </li>
        `).join('')}
        <li class="active padrao" >
            <div class="collapsible-header"><i class="material-icons" >library_add</i><b>Adicionar Questão #<span id="numeroQuestao">1</span></b></div>
            <div class="collapsible-body">
                <div id="template_exercicio">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="enunciado" class="materialize-textarea" data-length="120" name="questao[enunciado]"></textarea>
                            <label for="enunciado">Enunciado</label>
                            <input type="hidden" name="questao[quiz]" id="quizID" value="${model._id}" >
                        </div>
                    </div>
                    <div class="row">
                        <div  class="col s12 listaOpcoes" >
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <button id="salvaECriaProxima" class="btn waves-effect waves-light btn-small  right" >
                                <i class="material-icons left" >save</i>Salvar</i>
                            </button>
                            <button id="botao-adicionaOpcao" class="btn waves-effect waves-light teal btn-small right-20 right" type="button" name="action">Adicionar Opção
                                <i class="material-icons left">add</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </li>`;                
    }
}