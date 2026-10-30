const seletores = {
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  produtosDoPedido: '#cart_info tbody tr[id^="product-"]',
  comentario: 'textarea[name="message"]',
  botaoFazerPedido: 'a[href="/payment"]',
};

function fazerPedido(comentario) {
  cy.get(seletores.comentario).type(comentario);
  cy.get(seletores.botaoFazerPedido).click();
}

function verificarSeDetalhesDoPedidoEstaoVisiveis(endereco, quantidadeProdutos) {
  cy.get(seletores.enderecoEntrega)
    .should('be.visible')
    .and('contain.text', `${endereco.primeiroNome} ${endereco.sobrenome}`)
    .and('contain.text', endereco.endereco)
    .and('contain.text', endereco.cidade)
    .and('contain.text', endereco.celular);
  cy.get(seletores.enderecoCobranca)
    .should('be.visible')
    .and('contain.text', endereco.endereco);
  cy.get(seletores.produtosDoPedido).should('have.length', quantidadeProdutos);
}

module.exports = {
  fazerPedido,
  verificarSeDetalhesDoPedidoEstaoVisiveis,
};
