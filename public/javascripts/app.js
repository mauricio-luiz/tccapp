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

