class TabelaFinalizadosView extends View{

    template(model){
        return `
            <div class="responsive" >
                <table class="highlight centered" style="display: block; overflow-x: auto; white-space: nowrap;">
                    <thead>                            
                        <tr>
                            <th>Alunos</th>
                            ${model.questoes.map( (questao, numero) => `
                                <th>#${numero+1}</th>
                            `).join('') }
                        </tr>
                    </thead>        
                    <tbody id="finalizado">
                        <tr>
                            <td id="nA" colspan="${ model.questoes.length+1 }" >Nenhum Aluno terminou</td>
                        </tr>                     
                    </tbody>
                    <tfoot>                            
                        <tr>
                            <th>Alunos</th>
                            ${model.questoes.map( (questao, numero) => `
                                <th>#${numero+1}</th>
                            `).join('') }
                        </tr>
                    </tfoot> 
                </table>
            </div>
        `;
    }   
}

