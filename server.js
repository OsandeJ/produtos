console.log("Iniciando o servidor...");

const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const CLIENTES_FILE = 'clientes.json';
const PRODUTOS_FILE = 'produtos.json';
const PEDIDOS_FILE = 'pedidos.json';

app.use(express.json());
app.use(cors());

// Função auxiliar para ler arquivos JSON
const lerArquivo = (caminho) => {
    return fs.existsSync(caminho) ? JSON.parse(fs.readFileSync(caminho, 'utf-8')) : [];
};

// Função auxiliar para escrever arquivos JSON
const escreverArquivo = (caminho, dados) => {
    fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
};

// 🔹 Endpoint para obter produtos
app.get('/produtos', (req, res) => {
    res.json(lerArquivo(PRODUTOS_FILE));
});

// 🔹 Endpoint para adicionar um novo produto
app.post('/produtos', (req, res) => {
    const novoProduto = req.body;
    let produtos = lerArquivo(PRODUTOS_FILE);

    // Verifica se o produto já existe pelo nome
    if (produtos.some(produto => produto.nome === novoProduto.nome)) {
        return res.status(400).json({ message: "Produto já cadastrado!" });
    }

    produtos.push(novoProduto);
    escreverArquivo(PRODUTOS_FILE, produtos);

    res.status(201).json({ message: "Produto cadastrado com sucesso!" });
});

// 🔹 Endpoint para obter clientes
app.get('/clientes', (req, res) => {
    res.json(lerArquivo(CLIENTES_FILE));
});

// 🔹 Endpoint para adicionar um cliente
app.post('/clientes', (req, res) => {
    const novoCliente = req.body;
    let clientes = lerArquivo(CLIENTES_FILE);

    if (clientes.some(cliente => cliente.telefone === novoCliente.telefone)) {
        return res.status(400).json({ message: "Cliente com este telefone já existe!" });
    }

    clientes.push(novoCliente);
    escreverArquivo(CLIENTES_FILE, clientes);

    res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
});

// 🔹 Endpoint para registrar pedidos com ID único
app.post('/pedidos', (req, res) => {
    let pedidos = lerArquivo(PEDIDOS_FILE);
    const novoPedido = {
        id: pedidos.length + 1, // Define um ID baseado no tamanho do array
        cliente: req.body.cliente,
        produto: req.body.produto,
        quantidade: req.body.quantidade
    };

    pedidos.push(novoPedido);
    escreverArquivo(PEDIDOS_FILE, pedidos);

    res.status(201).json({ message: "Pedido registrado com sucesso!", pedido: novoPedido });
});

// 🔹 Endpoint para obter todos os pedidos
app.get('/pedidos', (req, res) => {
    res.json(lerArquivo(PEDIDOS_FILE));
});
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
