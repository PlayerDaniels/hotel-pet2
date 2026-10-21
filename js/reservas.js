const linhas = document.querySelectorAll(".cadastrados .usuario-cadastrado");

const campoId = document.getElementById("busca-id");
const campoProprietario = document.getElementById("busca-proprietario");
const campoStatus = document.getElementById("busca-status");
const campoInicio = document.getElementById("busca-inicio");
const campoFim = document.getElementById("busca-fim");
const campoTotalMin = document.getElementById("busca-total-min");
const campoTotalMax = document.getElementById("busca-total-max");
const campoPet = document.getElementById("busca-pet");

// Colunas: 0=check, 1=ID, 2=Pet, 3=Chegada, 4=Partida, 5=Status, 6=Total
function coluna(linha, posicao) {
    return linha.children[posicao].textContent.trim().toLowerCase();
}

function contem(valor, busca) {
    return valor.includes(busca.trim().toLowerCase());
}

// "22/08/2026" -> "2026-08-22" (mesmo formato do input date, dá para comparar)
function paraData(texto) {
    const partes = texto.split("/");
    return partes[2] + "-" + partes[1] + "-" + partes[0];
}

// "232,00" ou "R$ 1.232,50" -> 232 ou 1232.5
function paraNumero(texto) {
    const limpo = texto.replace("R$", "").replace(/\./g, "").replace(",", ".").trim();
    return parseFloat(limpo);
}

function pesquisar() {
    linhas.forEach(function (linha) {
        const chegada = paraData(coluna(linha, 3));
        const partida = paraData(coluna(linha, 4));
        const total = paraNumero(coluna(linha, 6));

        let combina =
            contem(coluna(linha, 1), campoId.value) &&
            contem(linha.dataset.proprietario.toLowerCase(), campoProprietario.value) &&
            contem(coluna(linha, 2), campoPet.value);

        if (campoStatus.value !== "") {
            combina = combina && coluna(linha, 5) === campoStatus.value;
        }
        if (campoInicio.value !== "") {
            combina = combina && chegada >= campoInicio.value;
        }
        if (campoFim.value !== "") {
            combina = combina && partida <= campoFim.value;
        }
        if (campoTotalMin.value.trim() !== "") {
            combina = combina && total >= paraNumero(campoTotalMin.value);
        }
        if (campoTotalMax.value.trim() !== "") {
            combina = combina && total <= paraNumero(campoTotalMax.value);
        }

        linha.style.display = combina ? "" : "none";
    });
}

function limpar() {
    campoId.value = "";
    campoProprietario.value = "";
    campoStatus.value = "";
    campoInicio.value = "";
    campoFim.value = "";
    campoTotalMin.value = "";
    campoTotalMax.value = "";
    campoPet.value = "";
    pesquisar();
}

document.getElementById("btn-pesquisar").addEventListener("click", pesquisar);
document.getElementById("btn-limpar").addEventListener("click", limpar);
