const containerRecentes = document.querySelector("#animaisRecentes");


function carregarAnimaisRecentes() {

    const animais = JSON.parse(
        localStorage.getItem("bingolu_animais")
    ) || [];


    const favoritos = JSON.parse(
        localStorage.getItem("bingolu_favoritos")
    ) || [];


    containerRecentes.innerHTML = "";


    if (animais.length === 0) {

        containerRecentes.innerHTML = `

            <div class="nenhum-resultado">

                <h3>
                    🐾 Nenhum animal cadastrado ainda
                </h3>

                <p>
                    Seja o primeiro a cadastrar um animal!
                </p>

                <a
                    href="pages/cadastrar.html"
                    class="details-button"
                >
                    📢 Cadastrar animal
                </a>

            </div>

        `;

        return;

    }


    const animaisRecentes = animais
        .slice()
        .reverse()
        .slice(0, 3);


    animaisRecentes.forEach(animal => {

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


        const id = String(animal.id);

        const jaFavoritado =
            favoritos.map(String).includes(id);


        card.innerHTML = `

            <div class="animal-photo">

                ${
                    animal.foto
                        ? `
                            <img
                                src="${animal.foto}"
                                alt="Foto de ${animal.nome}"
                                style="
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                "
                            >
                        `
                        : emoji
                }

            </div>


            <div class="animal-info">

                <span class="status ${statusClass}">
                    ${statusTexto}
                </span>

                <h3>
                    ${animal.nome}
                </h3>

                <p>
                    🐾 ${animal.tipo}
                </p>

                <p>
                    📍 ${animal.cidade} - ${animal.bairro}
                </p>


                <button
                    class="favorite-button"
                    data-id="${animal.id}"
                    title="Adicionar aos favoritos"
                >
                    ${
                        jaFavoritado
                            ? "❤️ Favoritado"
                            : "♡ Favoritar"
                    }
                </button>


                <a
                    href="pages/detalhes.html?id=${animal.id}"
                    class="details-button"
                >
                    Ver detalhes →
                </a>

            </div>

        `;


        containerRecentes.appendChild(card);

    });

}


document.addEventListener("click", function (event) {

    const botaoFavorito =
        event.target.closest(".favorite-button");


    if (!botaoFavorito) return;


    const id = String(
        botaoFavorito.dataset.id
    );


    let favoritos = JSON.parse(
        localStorage.getItem("bingolu_favoritos")
    ) || [];


    favoritos = favoritos.map(String);


    if (favoritos.includes(id)) {

        favoritos = favoritos.filter(
            favoritoId => favoritoId !== id
        );

    } else {

        favoritos.push(id);

    }


    localStorage.setItem(
        "bingolu_favoritos",
        JSON.stringify(favoritos)
    );


    carregarAnimaisRecentes();

});


carregarAnimaisRecentes();
