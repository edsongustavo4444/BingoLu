const container = document.querySelector("#detalhesAnimal");


const parametros = new URLSearchParams(
    window.location.search
);


const id = parametros.get("id");


const animais = JSON.parse(
    localStorage.getItem("bingolu_animais")
) || [];


const animal = animais.find(
    item => String(item.id) === String(id)
);


if (!animal) {

    container.innerHTML = `

        <div class="erro-animal">

            <h2>🐾 Animal não encontrado</h2>

            <p>
                Esse anúncio pode ter sido removido
                ou não existe.
            </p>

            <br>

            <a href="buscar.html" class="botao-contato">
                Voltar para busca
            </a>

        </div>

    `;

} else {

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
            ? "🔴 Animal perdido"
            : "🟢 Animal encontrado";


    container.innerHTML = `

        <div class="detalhes-foto">

            ${
                animal.foto
                    ? `<img
                        src="${animal.foto}"
                        alt="Foto de ${animal.nome}"
                        style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 20px;
                        "
                    >`
                    : emoji
            }

        </div>


        <div class="detalhes-info">

            <span class="status ${statusClass}">
                ${statusTexto}
            </span>


            <h1>${animal.nome}</h1>


            <div class="info-lista">

                <div class="info-item">
                    🐾 <strong>Tipo:</strong>
                    ${animal.tipo}
                </div>

                <div class="info-item">
                    🧬 <strong>Raça:</strong>
                    ${animal.raca || "Não informado"}
                </div>

                <div class="info-item">
                    🎨 <strong>Cor:</strong>
                    ${animal.cor}
                </div>

                <div class="info-item">
                    ⚥ <strong>Sexo:</strong>
                    ${animal.sexo || "Não informado"}
                </div>

                <div class="info-item">
                    📍 <strong>Local:</strong>
                    ${animal.bairro}, ${animal.cidade}
                </div>

                <div class="info-item">
                    📅 <strong>Data:</strong>
                    ${animal.data}
                </div>

            </div>


            <p class="descricao">

                <strong>📝 Informações:</strong><br><br>

                ${animal.descricao || "Nenhuma informação adicional."}

            </p>


            <div class="contato-box">

                <h3>📞 Tem alguma informação?</h3>

                <p>
                    Entre em contato com a pessoa responsável
                    pelo anúncio.
                </p>

                <p>
                    <strong>${animal.contato}</strong>
                </p>

                <a
                    href="tel:${animal.telefone}"
                    class="botao-contato"
                >
                    📞 Entrar em contato
                </a>

            </div>

        </div>

    `;

}


/* ===============================
   EXCLUIR ANIMAL
   =============================== */

document.addEventListener("click", function (event) {

    const botaoExcluir =
        event.target.closest("#excluirAnimal");


    if (!botaoExcluir) return;


    if (!animal) return;


    const confirmar = confirm(
        `Tem certeza que deseja excluir ${animal.nome}?`
    );


    if (!confirmar) return;


    const animaisAtualizados = animais.filter(
        item => String(item.id) !== String(id)
    );


    localStorage.setItem(
        "bingolu_animais",
        JSON.stringify(animaisAtualizados)
    );


    let favoritos = JSON.parse(
        localStorage.getItem("bingolu_favoritos")
    ) || [];


    favoritos = favoritos.filter(
        favoritoId =>
            String(favoritoId) !== String(id)
    );


    localStorage.setItem(
        "bingolu_favoritos",
        JSON.stringify(favoritos)
    );


    alert(
        "🐾 Animal excluído com sucesso!"
    );


    window.location.href = "buscar.html";

});
