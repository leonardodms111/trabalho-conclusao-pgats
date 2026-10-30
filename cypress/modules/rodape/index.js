// Component Object: o rodapé aparece em todas as páginas da aplicação
const seletores = {
  rodape: 'footer',
  tituloInscricao: '.single-widget h2',
  email: '#susbscribe_email',
  botaoInscrever: '#subscribe',
  mensagemSucesso: '#success-subscribe',
};

function rolarAteRodape() {
  cy.get(seletores.rodape).scrollIntoView();
}

function inscreverEmail(email) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoInscrever).click();
}

function verificarSeTituloInscricaoEstaVisivel() {
  cy.get(seletores.tituloInscricao)
    .should('be.visible')
    .and('have.text', 'Subscription');
}

function verificarSeInscricaoFoiRealizada() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  rolarAteRodape,
  inscreverEmail,
  verificarSeTituloInscricaoEstaVisivel,
  verificarSeInscricaoFoiRealizada,
};
