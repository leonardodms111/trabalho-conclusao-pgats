describe('Home', () => {
  it('Deve abrir a página inicial e exibir o logo do site', () => {
    cy.visit('/');
    cy.title().should('eq', 'Automation Exercise');
    cy.get('img[alt="Website for automation practice"]').should('be.visible');
  });
});
