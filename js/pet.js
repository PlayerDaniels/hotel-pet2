const linhas = document.querySelectorAll(".cadastrados .usuario-cadastrado");

const campoId = document.getElementById("busca-id");
const campoNome = document.getElementById("busca-nome");
const campoTipo = document.getElementById("busca-tipo");
const campoRaca = document.getElementById("busca-raca");
const campoTamanho = document.getElementById("busca-tamanho");

// Texto de uma coluna da linha (0=check, 1=ID, 2=Nome, 3=Tipo, 4=Raça, 5=Tamanho)
function coluna(linha, posicao) {
    return linha.children[posicao].textContent.trim().toLowerCase();
}

function contem(valor, busca) {
    return valor.includes(busca.trim().toLowerCase());
}

function pesquisar() {
    linhas.forEach(function (linha) {
        let combina =
            contem(coluna(linha, 1), campoId.value) &&
            contem(coluna(linha, 2), campoNome.value) &&
            contem(coluna(linha, 4), campoRaca.value) &&
            contem(coluna(linha, 5), campoTamanho.value);

        if (campoTipo.value !== "") {
            combina = combina && coluna(linha, 3) === campoTipo.value;
        }

        linha.style.display = combina ? "" : "none";
    });
}

function limpar() {
    campoId.value = "";
    campoNome.value = "";
    campoTipo.value = "";
    campoRaca.value = "";
    campoTamanho.value = "";
    pesquisar();
}

document.getElementById("btn-pesquisar").addEventListener("click", pesquisar);
document.getElementById("btn-limpar").addEventListener("click", limpar);
