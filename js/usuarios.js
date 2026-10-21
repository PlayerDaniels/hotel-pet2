const linhas = document.querySelectorAll(".cadastrados .usuario-cadastrado");

const campoId = document.getElementById("busca-id");
const campoEmail = document.getElementById("busca-email");
const campoStatus = document.getElementById("busca-status");
const campoInicio = document.getElementById("busca-inicio");
const campoFim = document.getElementById("busca-fim");
const campoNome = document.getElementById("busca-nome");
const campoFuncao = document.getElementById("busca-funcao");

// Colunas: 0=check, 1=Foto, 2=Email, 3=Nome, 4=Função, 5=Status, 6=Criado em
function coluna(linha, posicao) {
    return linha.children[posicao].textContent.trim().toLowerCase();
}

function contem(valor, busca) {
    return valor.includes(busca.trim().toLowerCase());
}

// "17/08/2026" -> "2026-08-17"
function paraData(texto) {
    const partes = texto.split("/");
    return partes[2] + "-" + partes[1] + "-" + partes[0];
}

function pesquisar() {
    linhas.forEach(function (linha) {
        const criado = paraData(coluna(linha, 6));

        let combina =
            contem(linha.dataset.id, campoId.value) &&
            contem(coluna(linha, 2), campoEmail.value) &&
            contem(coluna(linha, 3), campoNome.value);

        if (campoStatus.value !== "") {
            combina = combina && coluna(linha, 5) === campoStatus.value;
        }
        if (campoFuncao.value !== "") {
            combina = combina && coluna(linha, 4) === campoFuncao.value;
        }
        if (campoInicio.value !== "") {
            combina = combina && criado >= campoInicio.value;
        }
        if (campoFim.value !== "") {
            combina = combina && criado <= campoFim.value;
        }

        linha.style.display = combina ? "" : "none";
    });
}

function limpar() {
    campoId.value = "";
    campoEmail.value = "";
    campoStatus.value = "";
    campoInicio.value = "";
    campoFim.value = "";
    campoNome.value = "";
    campoFuncao.value = "";
    pesquisar();
}

document.getElementById("btn-pesquisar").addEventListener("click", pesquisar);
document.getElementById("btn-limpar").addEventListener("click", limpar);
