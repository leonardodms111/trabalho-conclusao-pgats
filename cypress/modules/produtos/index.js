const seletores = {
  tituloLista: '.features_items h2.title',
  listaProdutos: '.features_items .product-image-wrapper',
  linkVerProduto: '.features_items .choose a',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',

  informacoesProduto: '.product-information',
  nomeProduto: '.product-information h2',
  botaoAdicionarCarrinho: '.product-information button.cart',
  botaoContinuarComprando: '#cartModal .close-modal',
};

function abrirPrimeiroProduto() {
  cy.get(seletores.linkVerProduto).first().click();
}

function buscarProduto(nome) {
  cy.get(seletores.campoBusca).type(nome);
  cy.get(seletores.botaoBusca).click();
}

function adicionarProdutosAoCarrinho(idsProdutos) {
  idsProdutos.forEach((id) => {
    cy.visit(`/product_details/${id}`);
    cy.get(seletores.botaoAdicionarCarrinho).click();
    cy.get(seletores.botaoContinuarComprando).click();
  });
}

function verificarSeListaDeProdutosEstaVisivel() {
  cy.url().should('include', '/products');
  cy.get(seletores.tituloLista)
    .should('be.visible')
    .and('have.text', 'All Products');
  cy.get(seletores.listaProdutos).should('have.length.greaterThan', 0);
}

function verificarSeDetalhesDoProdutoEstaoVisiveis() {
  cy.url().should('include', '/product_details/');
  cy.get(seletores.nomeProduto).should('be.visible');
  cy.get(seletores.informacoesProduto)
    .should('contain.text', 'Category:')
    .and('contain.text', 'Rs.')
    .and('contain.text', 'Availability:')
    .and('contain.text', 'Condition:')
    .and('contain.text', 'Brand:');
}

function verificarSeProdutosBuscadosEstaoVisiveis() {
  cy.get(seletores.tituloLista)
    .should('be.visible')
    .and('have.text', 'Searched Products');
  cy.get(seletores.listaProdutos)
    .should('have.length.greaterThan', 0)
    .each(($produto) => {
      cy.wrap($produto).should('be.visible');
    });
}

module.exports = {
  abrirPrimeiroProduto,
  buscarProduto,
  adicionarProdutosAoCarrinho,
  verificarSeListaDeProdutosEstaVisivel,
  verificarSeDetalhesDoProdutoEstaoVisiveis,
  verificarSeProdutosBuscadosEstaoVisiveis,
};
