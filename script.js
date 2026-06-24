/* MODAL DE DETALHES DO PRATO */

// Busca os elementos do modal no HTML
const modal = document.getElementById("modal-prato");
const modalImagem = document.getElementById("modal-imagem");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescricao = document.getElementById("modal-descricao");
const modalPreco = document.getElementById("modal-preco");
const quantidadeAtual = document.getElementById("quantidade-atual");
const btnMais = document.getElementById("btn-mais");
const btnMenos = document.getElementById("btn-menos");
const btnFechar = document.getElementById("modal-fechar");

// Quantidade inicial do produto
let quantidade = 1;

// Seleciona todos os cards clicáveis
const cardsClicaveis = document.querySelectorAll(".card-clicavel");

if (cardsClicaveis.length > 0) {
  cardsClicaveis.forEach(function (card) {
    card.addEventListener("click", function () {

      // Preenche o modal com os dados do card clicado
      modalImagem.src = card.dataset.imagem;
      modalImagem.alt = card.dataset.titulo;
      modalTitulo.innerText = card.dataset.titulo;
      modalDescricao.innerText = card.dataset.descricao;
      modalPreco.innerText = "R$ " + card.dataset.preco;

      // Reinicia a quantidade para 1
      quantidade = 1;
      quantidadeAtual.innerText = quantidade;

      // Abre o modal
      modal.classList.add("aberto");
    });
  });
}

// Aumenta a quantidade do produto
if (btnMais) {
  btnMais.addEventListener("click", function () {
    quantidade = quantidade + 1;
    quantidadeAtual.innerText = quantidade;
  });
}

// Diminui a quantidade do produto
if (btnMenos) {
  btnMenos.addEventListener("click", function () {
    if (quantidade > 1) {
      quantidade = quantidade - 1;
      quantidadeAtual.innerText = quantidade;
    }
  });
}

// Fecha o modal ao clicar no botão fechar
if (btnFechar) {
  btnFechar.addEventListener("click", function () {
    modal.classList.remove("aberto");
  });
}

// Fecha o modal ao clicar fora da área de conteúdo
if (modal) {
  modal.addEventListener("click", function (evento) {
    if (evento.target === modal) {
      modal.classList.remove("aberto");
    }
  });
}

/* SACOLA / CARRINHO (localStorage) */

// Elementos da sacola
const btnAdicionarSacola = document.getElementById("btn-adicionar-sacola");
const sacolaContador = document.getElementById("sacola-contador");

// Lê os itens salvos no localStorage
function lerSacola() {
  const textoGuardado = localStorage.getItem("sacola");

  if (textoGuardado === null) {
    return [];
  }

  return JSON.parse(textoGuardado);
}

// Salva a lista de itens no localStorage
function salvarSacola(lista) {
  const textoParaGuardar = JSON.stringify(lista);
  localStorage.setItem("sacola", textoParaGuardar);
}

// Atualiza o número exibido no contador da sacola
function atualizarContadorSacola() {
  const lista = lerSacola();
  let total = 0;

  // Soma a quantidade de todos os itens
  for (let i = 0; i < lista.length; i++) {
    total = total + lista[i].quantidade;
  }

  if (sacolaContador) {
    sacolaContador.innerText = total;
  }
}

// Atualiza o contador ao carregar a página
atualizarContadorSacola();

// Adiciona o item atual na sacola
if (btnAdicionarSacola) {
  btnAdicionarSacola.addEventListener("click", function () {

    // Converte o preço para número
    const textoPreco = modalPreco.innerText;
    const precoSemRS = textoPreco.replace("R$ ", "");
    const precoNumero = parseFloat(precoSemRS);

    // Cria o objeto do produto
    const item = {
      titulo: modalTitulo.innerText,
      preco: precoNumero,
      imagem: modalImagem.src,
      quantidade: quantidade
    };

    // Adiciona o item à lista da sacola
    const lista = lerSacola();
    lista.push(item);

    salvarSacola(lista);

    // Atualiza o contador e fecha o modal
    atualizarContadorSacola();
    modal.classList.remove("aberto");
  });
}

/* BUSCA NA MESMA PÁGINA
  Esconde os cards que não combinam com o
  que foi digitado no campo de pesquisa. */

// Campo de pesquisa
const campoPesquisa = document.getElementById("campoPesquisa");

if (campoPesquisa) {
  campoPesquisa.addEventListener("input", function () {

    // Texto digitado pelo usuário
    const termoDigitado = campoPesquisa.value.toLowerCase();

    // Seleciona todos os cards
    const todosOsCards = document.querySelectorAll(".card");

    for (let i = 0; i < todosOsCards.length; i++) {
      const card = todosOsCards[i];

      // Obtém título e descrição do card
      const tituloDoCard = card.querySelector("h3").innerText.toLowerCase();
      const descricaoDoCard = card.querySelector("p").innerText.toLowerCase();

      // Verifica se o termo existe no título ou descrição
      const achouNoTitulo = tituloDoCard.indexOf(termoDigitado) !== -1;
      const achouNaDescricao = descricaoDoCard.indexOf(termoDigitado) !== -1;

      // Mostra ou esconde o card
      if (achouNoTitulo || achouNaDescricao) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    }
  });
}

/* --- MENU HAMBÚRGUER (celular) --- */
const menuHamburguer = document.getElementById("menuHamburguer");
const menuNav = document.getElementById("menuNav");

if (menuHamburguer) {
  menuHamburguer.addEventListener("click", function () {
    menuNav.classList.toggle("aberto");
  });
}