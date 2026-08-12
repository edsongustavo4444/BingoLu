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
                ${emoji}
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
            animal.nome.toLowerCase().includes(pesquisa) ||
            animal.cor.toLowerCase().includes(pesquisa) ||
            animal.descricao.toLowerCase().includes(pesquisa);


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


carregarAnimais();
