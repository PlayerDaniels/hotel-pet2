// Navegação do site Hotel Pet
// Como usar no HTML (atributos nos botões e links):
//   data-destino="pagina.html"  -> ao clicar, abre essa página
//   data-aviso="texto"          -> mostra uma mensagem antes de navegar
//   data-confirmar="texto"      -> pergunta antes; se cancelar, não faz nada
//   data-acao="limpar"          -> esvazia os campos da página

// Navegar entre páginas
document.querySelectorAll("[data-destino], [data-aviso], [data-confirmar]").forEach(function (elemento) {
    elemento.addEventListener("click", function (evento) {
        evento.preventDefault();

        if (elemento.dataset.confirmar && !confirm(elemento.dataset.confirmar)) {
            return;
        }
        if (elemento.dataset.aviso) {
            alert(elemento.dataset.aviso);
        }
        if (elemento.dataset.destino) {
            window.location.href = elemento.dataset.destino;
        }
    });
});

// Botão Limpar dos formulários
document.querySelectorAll("[data-acao='limpar']").forEach(function (botao) {
    botao.addEventListener("click", function () {
        const area = botao.closest(".conteudo") || document;

        area.querySelectorAll("input, textarea").forEach(function (campo) {
            if (campo.type === "checkbox") {
                campo.checked = false;
            } else {
                campo.value = "";
            }
        });

        area.querySelectorAll("select").forEach(function (lista) {
            lista.selectedIndex = 0;
        });
    });
});
