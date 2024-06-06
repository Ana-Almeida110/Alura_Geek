import { produtos_serv } from "./produtos_serv.js";

const produtosContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function criarProduto(nome, valor, imagem, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div>
        <img src="${imagem}" alt="${nome}">
        <div class="card-container--info">
            <p>${nome}</p>
            <div class="card-container--value">
                <p>R$ ${valor}</p>
                <button img src="./imagem/Vector.svg"class="img_lixeira" data-id="${id}">
                    <img src="./imagem/Vector.svg" alt="Eliminar">
                </button>
            </div>
        </div>
    </div>
    `;

    produtosContainer.appendChild(card);

    const btnLixeira = card.querySelector(".img_lixeira");
    btnLixeira.addEventListener("click", async () => {
        const produtoId = btnLixeira.getAttribute("data-id");
        produtos_serv.deletarProduto(produtoId).then(() => {
            produtosContainer.removeChild(card);
        }).catch((err) => console.log(err));
    });

    return card;
}

const renderizar = async () => {
    try {
        const produtos = await produtos_serv.listarProdutos();
        if (produtos && Array.isArray(produtos)) {
            produtos.forEach(produto => {
                produtosContainer.appendChild(
                    criarProduto(
                        produto.nome,
                        produto.valor,
                        produto.imagem,
                        produto.id)
                );
            });
       }
    } catch (error) { 
        console.error("Erro ao listar produtos:", error);
    }
}; 

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.querySelector("[data-nome]").value;
    const valor = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;

    produtos_serv.criarElemento(nome, valor, imagem).then((res) => {
        criarProduto(nome, valor, imagem, res.id);
    }).catch((err) => console.log(err))

    console.log(nome);
    console.log(valor);
    console.log(imagem);    
})

renderizar();

 
 