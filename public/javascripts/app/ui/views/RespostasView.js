class RespostasView extends View{

    adiciona(model){
        this._seletor.innerHTML += this.template(model);
    }

    adicionaResposta(aluno, questao, resposta){
        const local = this._seletor.querySelector(`tr[data-aluno="${aluno}"] td[class="td-${questao}"]`);
        console.log(local, aluno, questao);
        const tipo_resposta = resposta === 0 ? '<i class="material-icons small red-text">clear</i>' :
                                          '<i class="material-icons small green-text">done</i>';

        local.innerHTML = tipo_resposta;
    }

    template(model){
        console.log(model);
        return  `<tr data-aluno="${ model.email}" >
                        <td>${model.aluno}</td>
                        ${model.respostas.map( (resposta, indice) => `<td class="td-${indice}"><i class="material-icons small">${resposta}</i></td>` ).join('')}
                    </tr>
                   `;
                
    }
}