const listaFavoritos = document.querySelector("#listaFavoritos");

const contadorFavoritos = document.querySelector(
    "#contadorFavoritos"
);


function carregarFavoritos() {

    const animais = JSON.parse(
        localStorage.getItem("bingolu_animais")
    ) || [];


    const favoritos = JSON.parse(
        localStorage.getItem("bingolu_favoritos")
    ) || [];


    const favoritosIds = favoritos.map(String);


    const animaisFavoritos = animais.filter(animal =>
        favoritosIds.includes(String(animal.id))
    );


    mostrarFavoritos(animaisFavoritos);

}


function mostrarFavoritos(animais) {

    listaFavoritos.innerHTML = "";


    contadorFavoritos.textContent =
        `${animais.length} favorito(s)`;


    if (animais.length === 0) {

        listaFavoritos.innerHTML = `

            <div class="nenhum-resultado">

                <h3>❤️ Nenhum favorito ainda</h3>

                <p>
                    Vá até a página de animais e favorite
                    aqueles que você quer acompanhar.
                </p>

                <br>

                <a
                    href="buscar.html"
                    class="details-button"
                >
                    🔎 Procurar animais
                </a>

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


                <p>
                    🐾 ${animal.tipo}
                </p>


                <p>
                    📍 ${animal.cidade} - ${animal.bairro}
                </p>


                <button
                    class="remove-favorite"
                    data-id="${animal.id}"
                >
                    💔 Remover dos favoritos
                </button>


                <a
                    href="detalhes.html?id=${animal.id}"
                    class="details-button"
                >
                    Ver detalhes →
                </a>

            </div>

        `;


        listaFavoritos.appendChild(card);

    });

}


document.addEventListener("click", function (event) {

    const botaoRemover =
        event.target.closest(".remove-favorite");


    if (!botaoRemover) return;


    const id =
        String(botaoRemover.dataset.id);


    let favoritos = JSON.parse(
        localStorage.getItem("bingolu_favoritos")
    ) || [];


    favoritos = favoritos
        .map(String)
        .filter(favoritoId =>
            favoritoId !== id
        );


    localStorage.setItem(
        "bingolu_favoritos",
        JSON.stringify(favoritos)
    );


    carregarFavoritos();

});


carregarFavoritos();
