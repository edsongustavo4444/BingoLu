const botaoBusca = document.querySelector(".search-button");

const campoPesquisa = document.querySelector("#pesquisa");

const campoTipo = document.querySelector("#tipo");

const campoCidade = document.querySelector("#cidade");

const campoStatus = document.querySelector("#status");

const container = document.querySelector(".resultados .animal-grid");

const contador = document.querySelector(
    ".resultados-header span"
);


function carregarAnimais() {

    const animais = JSON.parse(
        localStorage.getItem("bingolu_animais")
    ) || [];

    mostrarAnimais(animais);
}


function mostrarAnimais(animais) {

    container.innerHTML = "";

    contador.textContent =
        `${animais.length} resultado(s)`;


    if (animais.length === 0) {

        container.innerHTML = `
            <div class="nenhum-resultado">

                <h3>🐾 Nenhum animal encontrado</h3>

                <p>
                    Tente alterar os filtros ou cadastre um novo animal.
                </p>

            </div>
        `;

        return;
    }


    animais.forEach(animal => {

        const card = document.createElement("article");

        card.className = "animal-card";


        const emoji =
            animal.tipo === "gato"
                ? "🐱"
                : animal.tipo === "ave"
                ? "🦜"
                : animal.tipo === "cachorro"
                ? "🐶"
                : "🐾";


        const statusClass =
            animal.status === "perdido"
                ? "lost"
                : "found";


        const statusTexto =
            animal.status === "perdido"
                ? "🔴 Perdido"
                : "🟢 Encontrado";


        card.innerHTML = `

           <div class="animal-photo">

    ${
        animal.foto
            ? `<img
                src="${animal.foto}"
                alt="Foto de ${animal.nome}"
                style="
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                "
            >`
            : emoji
    }

</div>

            <div class="animal-info">

                <span class="status ${statusClass}">
                    ${statusTexto}
                </span>

                <h3>${animal.nome}</h3>

                <p>🐾 ${animal.tipo}</p>

                <p>
                    📍 ${animal.cidade} - ${animal.bairro}
                </p>
<button
    class="favorite-button"
    data-id="${animal.id}"
    title="Adicionar aos favoritos"
>
    ♡ Favoritar
</button>
                <a
    href="detalhes.html?id=${animal.id}"
    class="details-button"
>
    Ver detalhes →
</a>

            </div>

        `;


        container.appendChild(card);

    });

}


function filtrarAnimais() {

    const pesquisa =
        campoPesquisa.value.toLowerCase().trim();

    const tipo =
        campoTipo.value;

    const cidade =
        campoCidade.value.toLowerCase().trim();

    const status =
        campoStatus.value;


    const animais = JSON.parse(
        localStorage.getItem("bingolu_animais")
    ) || [];


    const filtrados = animais.filter(animal => {

        const combinaPesquisa =
    (animal.nome || "").toLowerCase().includes(pesquisa) ||
    (animal.cor || "").toLowerCase().includes(pesquisa) ||
    (animal.descricao || "").toLowerCase().includes(pesquisa);


        const combinaTipo =
            !tipo || animal.tipo === tipo;


        const combinaCidade =
            !cidade ||
            animal.cidade.toLowerCase().includes(cidade);


        const combinaStatus =
            !status || animal.status === status;


        return (
            combinaPesquisa &&
            combinaTipo &&
            combinaCidade &&
            combinaStatus
        );

    });


    mostrarAnimais(filtrados);
}


botaoBusca.addEventListener(
    "click",
    filtrarAnimais
);


const botaoLimpar = document.querySelector("#limparFiltros");

if (botaoLimpar) {

    botaoLimpar.addEventListener("click", function () {

        campoPesquisa.value = "";
        campoTipo.value = "";
        campoCidade.value = "";
        campoStatus.value = "";

        carregarAnimais();

    });

}

campoPesquisa.addEventListener("input", filtrarAnimais);

campoCidade.addEventListener("input", filtrarAnimais);

campoTipo.addEventListener("change", filtrarAnimais);

campoStatus.addEventListener("change", filtrarAnimais);
carregarAnimais();

document.addEventListener("click", function (event) {

    const botaoFavorito = event.target.closest(".favorite-button");

    if (!botaoFavorito) return;

    const id = botaoFavorito.dataset.id;

    let favoritos = JSON.parse(
        localStorage.getItem("bingolu_favoritos")
    ) || [];

    if (favoritos.includes(id)) {

        botaoFavorito.textContent = "♡ Favoritar";

        favoritos = favoritos.filter(function (favorito) {
            return favorito !== id;
        });

    } else {

        botaoFavorito.textContent = "❤️ Favoritado";

        favoritos.push(id);

    }

    localStorage.setItem(
        "bingolu_favoritos",
        JSON.stringify(favoritos)
    );

});
