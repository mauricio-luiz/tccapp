const opcoes = new OpcaoController();
const questao = new QuestaoController();
const exercicio = new ExercicioController();
const $ = document.querySelector.bind(document);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var options = {};
    var instances = M.Sidenav.init(elems, options);
  });

if( $('#botao-adicionaOpcao') !== null){
    document
    $('#botao-adicionaOpcao')
    .addEventListener('click', questao.adicionaOpcao.bind(questao));
}

if( $('#salvaQuestao') !== null){
    document
    $('#salvaQuestao')
    .addEventListener('click', questao.adiciona.bind(questao));
}

if($("#createQuiz") != null){
    document
    $("#createQuiz")
    .addEventListener('click', questao.cria.bind(questao));
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        coverTrigger : false,
        constrainWidth : false
    });
});

if(typeof questoes != 'undefined'){
    exercicio.adiciona(questoes);
}

if(typeof listaOpcoes != 'undefined' && typeof opcaoCorreta != 'undefined'){
    opcoes.adicionaOpcao(listaOpcoes, opcaoCorreta);
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, []);
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, []);
});

const validate = document.querySelectorAll('.validate');
function validaForm(){
    let retorno = true;
    if(validate != null){
        validate.forEach( (element) => {
            if(element.value == ""){
                element.classList.add('invalid');
                PNotify.alert({
                    title: 'ERROR!',
                    text: `Item ${element.id} é obrigatório`,
                    type: 'error'
                });
                retorno = false;
            }
        });
    }
    return retorno;
}

function antesExcluir(form, event){
    event.preventDefault();

    swal({
        title: "Você tem certeza?",
        text: "Item será removido e não poderá mais ser recuperado",       
        buttons: true,
        dangerMode: true
        })
        .then((willDelete) => {
            if (willDelete) {
                form.submit();
            }
    });
}