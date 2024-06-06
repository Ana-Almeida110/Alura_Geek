const baseURL = window.location.hostname.includes("localhost")?
    "http://localhost:3000/produtos":
    "/database/db.json";

const listarProdutos = () => {
    return fetch(baseURL)
        .then(response => response.json())
        .catch((err) => console.log(err));
};

const criarElemento = (nome, valor, imagem) => {
    if (!window.location.hostname.includes("localhost")) {
        return Promise.resolve({
            id: Date.now(),
            nome,
            valor,
            imagem
        });
    }

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
    if (!window.location.hostname.includes("localhost")) {
        return Promise.resolve({ id });
    }
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