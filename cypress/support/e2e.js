// Carregado automaticamente antes de cada arquivo de teste.
import './commands';
import 'cypress-mochawesome-reporter/register';

// Bloqueia os anúncios do site, que abrem overlays e tornam os cliques instáveis.
beforeEach(() => {
  cy.intercept(
    { hostname: /(googlesyndication|doubleclick|googleadservices|adtrafficquality|fundingchoicesmessages)\./ },
    { statusCode: 204, body: '' },
  );
});
