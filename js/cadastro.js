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
// CONVERTER FOTO
// ===============================

function arquivoParaBase64(arquivo) {

    return new Promise((resolve, reject) => {

        const leitor = new FileReader();

        leitor.onload = () => resolve(leitor.result);

        leitor.onerror = erro => reject(erro);

        leitor.readAsDataURL(arquivo);

    });

}


// ===============================
// CADASTRAR ANIMAL
// ===============================

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();


    const statusSelecionado = document.querySelector(
        'input[name="status"]:checked'
    );

// ===============================
// VALIDAÇÃO DO CADASTRO
// ===============================

const nome = document.querySelector("#nome").value.trim();
const tipo = document.querySelector("#tipo").value;
const cidade = document.querySelector("#cidade").value.trim();
const bairro = document.querySelector("#bairro").value.trim();
const descricao = document.querySelector("#descricao").value.trim();
const contato = document.querySelector("#contato").value.trim();
const telefone = document.querySelector("#telefone").value.trim();

if (!statusSelecionado) {
    alert("⚠️ Selecione se o animal está perdido ou encontrado.");
    return;
}

if (!nome) {
    alert("⚠️ Informe o nome do animal.");
    return;
}

if (!tipo) {
    alert("⚠️ Selecione o tipo do animal.");
    return;
}

if (!cidade) {
    alert("⚠️ Informe a cidade.");
    return;
}

if (!bairro) {
    alert("⚠️ Informe o bairro.");
    return;
}

if (!descricao) {
    alert("⚠️ Informe uma descrição do animal.");
    return;
}

if (!contato) {
    alert("⚠️ Informe o nome do responsável.");
    return;
}

if (!telefone) {
    alert("⚠️ Informe um telefone para contato.");
    return;
}
    
    const foto = inputFoto.files[0];


    let fotoAnimal = "";


    if (foto) {

        fotoAnimal = await arquivoParaBase64(foto);

    }


    const animal = {

        id: Date.now(),

        status: statusSelecionado
            ? statusSelecionado.value
            : "",

       nome: nome,
tipo: tipo,
cidade: cidade,
bairro: bairro,
descricao: descricao,
contato: contato,
telefone: telefone

    };


    let animais = JSON.parse(
        localStorage.getItem("bingolu_animais")
    ) || [];


    animais.push(animal);


    localStorage.setItem(
        "bingolu_animais",
        JSON.stringify(animais)
    );


    alert("🐾 Anúncio cadastrado com sucesso!");


    formulario.reset();


    window.location.href = "buscar.html";

});
