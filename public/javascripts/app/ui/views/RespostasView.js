class RespostasView extends View{

    template(model){
        return  `${model.paraArray().map( sala =>
                        `<tr data-aluno="${ sala.email}" >
                            <td>${sala.aluno}</td>
                            ${sala.respostas.map( resposta => `<td><i class="material-icons small">${resposta}</i></td>` ).join('')}
                        </tr>`).join('')}
                   `;
                
    }
}