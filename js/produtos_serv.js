const baseURL = window.location.hostname.includes("localhost")?
    "http://localhost:3000":
    "/database/db.json";

const listarProdutos = () => {
    return fetch("http://localhost:3000")
        .then(response => response.json())
        .catch((err) => console.log(err));
};

const criarElemento = (nome, valor, imagem) => {
    return fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nome, valor, imagem,
        })
    })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

const deletarProduto = (id) => {
    return fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
    })
    .catch((err) => console.log(err));
};

export const produtos_serv = {
    listarProdutos,
    criarElemento,
    deletarProduto
};