const email = document.getElementById("email");
const nome = document.getElementById("nome");
const sobrenome = document.getElementById("sobrenome");
const telefone = document.getElementById("telefone");
const tipo = document.getElementById("tipo");
const foto = document.getElementById("foto");

// Botão Limpar
document.getElementById("btn-limpar").addEventListener("click", function () {
    email.value = "";
    nome.value = "";
    sobrenome.value = "";
    telefone.value = "";
    tipo.value = "cliente";
    foto.value = "";
});

// Botão Salvar
document.getElementById("btn-salvar").addEventListener("click", function () {
    if (email.value === "" || nome.value === "" || sobrenome.value === "" || telefone.value === "") {
        alert("Preencha todos os campos.");
        return;
    }

    // Pega a lista que já existe (ou cria uma vazia)
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    usuarios.push({
        email: email.value,
        nome: nome.value,
        sobrenome: sobrenome.value,
        telefone: telefone.value,
        tipo: tipo.value
    });

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Usuário cadastrado com sucesso!");
    window.location.href = "usuarios.html";
});
