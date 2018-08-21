const opcao = new OpcaoController();
const $ = document.querySelector.bind(document);

document
    $('#botao-adicionaOpcao')
    .addEventListener('click', opcao.adiciona.bind(opcao));

