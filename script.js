document.getElementById("formProduto").addEventListener("submit", async (event) => {
    event.preventDefault();

    const produto = {
        nome: document.getElementById("nomeProduto").value,
        descricao: document.getElementById("descricao").value,
        preco: parseFloat(document.getElementById("preco").value)
    };

    const response = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto)
    });

    if (response.ok) {
        alert("Produto registrado com sucesso!");
        document.getElementById("formProduto").reset();
    }
});
