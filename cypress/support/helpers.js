function gerarEmail(prefixo = 'qa') {
  return `${prefixo}.${Date.now()}@teste.com`;
}

module.exports = {
  gerarEmail,
};
