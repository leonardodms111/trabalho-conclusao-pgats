const seletores = {
  nomeNoCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',
  tituloPedidoConfirmado: '[data-qa="order-placed"]',
  mensagemPedidoConfirmado: '[data-qa="order-placed"] + p',
};

function pagarEConfirmarPedido(cartao) {
  cy.get(seletores.nomeNoCartao).type(cartao.nome);
  cy.get(seletores.numeroCartao).type(cartao.numero);
  cy.get(seletores.cvc).type(cartao.cvc);
  cy.get(seletores.mesValidade).type(cartao.mesValidade);
  cy.get(seletores.anoValidade).type(cartao.anoValidade);
  cy.get(seletores.botaoPagar).click();
}

function verificarSePedidoFoiConfirmado() {
  cy.get(seletores.tituloPedidoConfirmado)
    .should('be.visible')
    .and('have.text', 'Order Placed!');
  cy.get(seletores.mensagemPedidoConfirmado)
    .should('be.visible')
    .and('have.text', 'Congratulations! Your order has been confirmed!');
}

module.exports = {
  pagarEConfirmarPedido,
  verificarSePedidoFoiConfirmado,
};
