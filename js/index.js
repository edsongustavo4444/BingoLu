const containerRecentes = document.querySelector("#animaisRecentes");


function carregarAnimaisRecentes() {

    const animais = JSON.parse(
        localStorage.getItem("bingolu_animais")
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


carregarAnimaisRecentes();
