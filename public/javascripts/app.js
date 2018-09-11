const opcao = new OpcaoController();
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

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {
        coverTrigger : false,
        constrainWidth : false
    });
});

