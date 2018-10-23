class CardView extends View{

    template(model){
        return `
        <div class="col s12 m6">
            <div class="card">
                <div id="${model.id}" class="card-content">
                    <span class="card-title">${model.titulo}</span>
                    <select id="select-${model.id}">
                        <option value="" >Selecione</option>
                        ${model.dados.map( value => `
                            <option value="${value._id }">${value.nome}</option>
                        `).join('')}
                    </select>
                </div>
            </div>
        </div>
        `;
    }   
}