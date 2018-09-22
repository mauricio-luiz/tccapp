const opcao = new OpcaoController();
const questao = new QuestaoController();
const $ = document.querySelector.bind(document);

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var options = {};
    var instances = M.Sidenav.init(elems, options);
  });

if( $('#botao-adicionaOpcao') !== null){
    document
    $('#botao-adicionaOpcao')
    .addEventListener('click', opcao.adiciona.bind(opcao));
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

