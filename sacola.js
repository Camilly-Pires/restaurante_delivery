const listaSacola = document.getElementById("lista-sacola");
const sacolaVazia = document.getElementById("sacola-vazia");
const sacolaTotalValor = document.getElementById("sacola-total-valor");

// Função responsável por exibir os itens da sacola na tela
function mostrarSacola() {
    const itens = lerSacola();

    // Limpa a lista antes de recriar os itens
    listaSacola.innerHTML = "";

    // Verifica se a sacola está vazia
    if (itens.length === 0) {
        sacolaVazia.style.display = "block";
    } else {
        sacolaVazia.style.display = "none";
    }

    let total = 0;

    // Percorre todos os itens da sacola
    for (let i = 0; i < itens.length; i++) {
        const item = itens[i];

        // Calcula o subtotal do item
        const subtotal = item.preco * item.quantidade;
        total = total + subtotal;

        // Cria a linha que representa o item na sacola
        const linha = document.createElement("div");
        linha.className = "item-sacola";

        // Cria a imagem do item
        const imagem = document.createElement("img");
        imagem.src = item.imagem;
        imagem.alt = item.titulo;

        // Cria a área de informações do item
        const infoTexto = document.createElement("div");
        infoTexto.className = "item-sacola-info";
        infoTexto.innerHTML =
            "<h3>" + item.titulo + "</h3>" +
            "<p>" + item.quantidade + "x R$ " + item.preco.toFixed(2) + "</p>" +
            "<strong>Subtotal: R$ " + subtotal.toFixed(2) + "</strong>";

        // Botão para diminuir 1 unidade do item
        const botaoMenos = document.createElement("button");
        botaoMenos.className = "item-sacola-menos";
        botaoMenos.innerText = "−";
        botaoMenos.setAttribute("data-indice", i);

        // Botão para aumentar 1 unidade do item
        const botaoMais = document.createElement("button");
        botaoMais.className = "item-sacola-mais";
        botaoMais.innerText = "+";
        botaoMais.setAttribute("data-indice", i);

        // Botão para remover todas as unidades do item
        const botaoRemoverTudo = document.createElement("button");
        botaoRemoverTudo.className = "item-sacola-remover";
        botaoRemoverTudo.innerText = "Remover tudo";
        botaoRemoverTudo.setAttribute("data-indice", i);

        // Adiciona os elementos na linha do item
        linha.appendChild(imagem);
        linha.appendChild(infoTexto);
        linha.appendChild(botaoMenos);
        linha.appendChild(botaoMais);
        linha.appendChild(botaoRemoverTudo);

        // Adiciona a linha na lista da sacola
        listaSacola.appendChild(linha);
    }

    // Exibe o valor total da sacola
    sacolaTotalValor.innerText = "R$ " + total.toFixed(2);

    // Adiciona evento aos botões de diminuir quantidade
    const botoesMenos = document.querySelectorAll(".item-sacola-menos");
    for (let i = 0; i < botoesMenos.length; i++) {
        botoesMenos[i].addEventListener("click", function () {
            const indice = this.getAttribute("data-indice");
            const itensAtuais = lerSacola();

            // Remove 1 unidade do item
            itensAtuais[indice].quantidade = itensAtuais[indice].quantidade - 1;

            // Remove o item da sacola caso a quantidade chegue a zero
            if (itensAtuais[indice].quantidade <= 0) {
                itensAtuais.splice(indice, 1);
            }

            salvarSacola(itensAtuais);
            atualizarContadorSacola();
            mostrarSacola();
        });
    }

    // Adiciona evento aos botões de aumentar quantidade
    const botoesMais = document.querySelectorAll(".item-sacola-mais");
    for (let i = 0; i < botoesMais.length; i++) {
        botoesMais[i].addEventListener("click", function () {
            const indice = this.getAttribute("data-indice");
            const itensAtuais = lerSacola();

            // Adiciona 1 unidade ao item
            itensAtuais[indice].quantidade = itensAtuais[indice].quantidade + 1;

            salvarSacola(itensAtuais);
            atualizarContadorSacola();
            mostrarSacola();
        });
    }

    // Adiciona evento aos botões de remover item completamente
    const botoesRemover = document.querySelectorAll(".item-sacola-remover");
    for (let i = 0; i < botoesRemover.length; i++) {
        botoesRemover[i].addEventListener("click", function () {
            const indice = this.getAttribute("data-indice");
            const itensAtuais = lerSacola();

            // Remove o item inteiro da sacola
            itensAtuais.splice(indice, 1);

            salvarSacola(itensAtuais);
            atualizarContadorSacola();
            mostrarSacola();
        });
    }
}

// Executa a função ao carregar a página
mostrarSacola();