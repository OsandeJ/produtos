document.getElementById('formCliente').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede que o envio do formulário recarregue a página

    console.log("Formulário enviado");  // Para verificar se o evento é acionado

    // Captura os dados do formulário
    const nomeCliente = document.getElementById('nomeCliente').value;
    const telefone = document.getElementById('telefone').value;

    // Cria um objeto com os dados do cliente
    const cliente = {
        nomeCliente: nomeCliente,
        telefone: telefone
    };

    // Verifica se já existe um arquivo (localStorage) para armazenar os clientes
    let clientes = localStorage.getItem('clientes');
    // Se já houver clientes salvos, adiciona o novo cliente à lista
    if (clientes) {
        clientes = JSON.parse(clientes); // Converte de string para objeto Json
    } else {
        clientes = []; // Caso não exista, cria um novo array
    }

    // Adiciona o novo cliente
    clientes.push(cliente);

    // Salva novamente no localStorage
    localStorage.setItem('clientes', JSON.stringify(clientes));

    // Exibe um alerta de sucesso
    alert('Cliente Cadastrado com Sucesso!');

    // Limpa os campos do formulário após o cadastro
    document.getElementById('formCliente').reset();
});
