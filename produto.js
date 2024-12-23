document.getElementById('formProduto').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede que o envio do formulário recarregue a pagina

    // Captura os dados do formulário
    const nomeProduto = document.getElementById('nomeProduto').value;
    const descricao = document.getElementById('descricao').value;
    const preco = parseFloat(document.getElementById('preco').value);

    // Cria um objeto com os dados do produto
    const produto = {
        nomeProduto: nomeProduto,
        descricao: descricao,
        preco: preco
    };

    // Verifica se já existe um arquivo (localStorage) para armazenar os produtos
    let produtos = localStorage.getItem('produtos');
    // Se já houver produtos salvos, adiciona o novo produto à lista
    if (produtos) {
        produtos = JSON.parse(produtos); // Converte de string para objeto Json
    } else {
        produtos = []; // Caso não exista, cria um novo array
    }

    // Adiciona o novo produto
    produtos.push(produto);

    // Salva novamente no localStorage
    localStorage.setItem('produtos', JSON.stringify(produtos));

    // Exibe um alerta de sucesso
    alert('Produto Cadastrado com Sucesso!');

    // Limpa os campos do formulário após o cadastro
    document.getElementById('formProduto').reset();
});