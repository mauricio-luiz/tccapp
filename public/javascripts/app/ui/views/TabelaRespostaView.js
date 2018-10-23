class TabelaRespostasView extends View{

    template(model){
        return `
            <table class="highlight centered responsive-table" style="display: block; overflow-x: auto; white-space: nowrap;">
                <thead>                            
                    <tr>
                        <th>Alunos</th>
                        ${model.questoes.map( (questao, numero) => `
                            <th>#${numero+1}</th>
                        `).join('') }
                    </tr>
                </thead>        
                <tbody id="resposta">
                    <tr>
                        <td id="nA" colspan="${ model.questoes.length+1 }" >Aguardando alunos</td>
                    </tr>                     
                </tbody>
            </table>
        `;
    }   
}

