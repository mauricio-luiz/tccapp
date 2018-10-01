class FinalizadoView extends View{

    template(model){
        console.log(model);
        return  `${model.paraArray().map( aluno =>
            `
                <tr>
                    <td>${aluno.aluno}</td>
                    ${aluno.questoes.map( (opcao, indice) => `<td class="td-${indice}">
                        <i class="material-icons small ${opcao.acertou ? 'green-text' : 'red-text'}">${opcao.acertou ? 'done' : 'clear'}</i>
                    </td>` ).join('')}
                </tr>
            `).join('')}
        `;
                
    }

}