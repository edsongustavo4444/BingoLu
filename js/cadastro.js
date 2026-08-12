const formulario = document.querySelector(".cadastro-form");

const inputFoto = document.querySelector('input[type="file"]');

const previewFoto = document.querySelector("#preview-foto");


// ===============================
// PRÉVIA DA FOTO
// ===============================

inputFoto.addEventListener("change", function () {

    const arquivo = inputFoto.files[0];

    if (!arquivo) {
        previewFoto.innerHTML = "";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (evento) {

        previewFoto.innerHTML = `
            <img
                src="${evento.target.result}"
                alt="Prévia da foto do animal"
                style="
                    width: 250px;
                    height: 250px;
                    border-radius: 15px;
                    margin-top: 15px;
                    object-fit: cover;
                "
            >
        `;

    };

    leitor.readAsDataURL(arquivo);

});


// ===============================
// CADASTRO DO ANIMAL
// ===============================

formulario.addEventListener("submit", function (event) {

    event.preventDefault();


    const statusSelecionado =
        document.querySelector(
            'input[name="status"]:checked'
        );


    const animal = {

        id: Date.now(),

        status: statusSelecionado
            ? statusSelecionado.value
            : "",

        nome: document.querySelector("#nome").value,

        tipo: document.querySelector("#tipo").value,

        raca: document.querySelector("#raca").value,

        cor: document.querySelector("#cor").value,

        sexo: document.querySelector("#sexo").value,

        cidade: document.querySelector("#cidade").value,

        bairro: document.querySelector("#bairro").value,

        local: document.querySelector("#local").value,

        data: document.querySelector("#data").value,

        descricao: document.querySelector("#descricao").value,

        contato: document.querySelector("#contato").value,

        telefone: document.querySelector("#telefone").value

    };


    let animais = JSON.parse(
        localStorage.getItem("bingolu_animais")
    ) || [];


    animais.push(animal);


    localStorage.setItem(
        "bingolu_animais",
        JSON.stringify(animais)
    );


    alert(
        "🐾 Anúncio cadastrado com sucesso!"
    );


    formulario.reset();


    window.location.href = "buscar.html";

});
