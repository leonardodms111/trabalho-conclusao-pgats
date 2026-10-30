const seletores = {
  paginaAtual: '.breadcrumb li.active',
  produtosNoCarrinho: '#cart_info tbody tr[id^="product-"]',
  botaoProsseguirCheckout: '.check_out',
};

function prosseguirParaCheckout() {
  cy.get(seletores.botaoProsseguirCheckout).click();
}

function verificarSeCarrinhoEstaVisivel(quantidadeProdutos) {
  cy.url().should('include', '/view_cart');
  cy.get(seletores.paginaAtual).should('have.text', 'Shopping Cart');
  cy.get(seletores.produtosNoCarrinho).should('have.length', quantidadeProdutos);
}

module.exports = {
  prosseguirParaCheckout,
  verificarSeCarrinhoEstaVisivel,
};
