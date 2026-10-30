const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Automation Exercise - Relatório de Testes',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  watchForFileChanges: false,
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
