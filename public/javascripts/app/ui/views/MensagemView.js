class MensagemView extends View{
    template(model){
        return  `<div class="row">
                    <div class="col s12">
                        <div class="card-panel ${model.cor} alerta">
                            <span class="white-text">${model.texto}
                            </span>
                        </div>
                    </div>
                </div>`;    
    }    
}

