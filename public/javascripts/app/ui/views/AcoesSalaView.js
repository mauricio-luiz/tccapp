class AcoesSalaView extends View{

    template(){
        return `
        <div class="col s12">
            <div id="salaCard" class="card">
                <div class="card-content center-align">
                    <button id="play" class="btn waves-effect waves-light disabled" type="submit" name="action">Iniciar
                        <i class="material-icons left">play_arrow</i>
                    </button>
                    <button id="stop" class="btn waves-effect red waves-light disabled" type="submit" name="action">Finalizar
                        <i class="material-icons left">stop</i>
                    </button>
                </div>
            </div>
        </div>
        `;
    }   
}