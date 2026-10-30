const home = require('../modules/home');
const menu = require('../modules/menu');
const rodape = require('../modules/rodape');
const cadastro = require('../modules/cadastro');
const login = require('../modules/login');
const conta = require('../modules/conta');
const produtos = require('../modules/produtos');
const carrinho = require('../modules/carrinho');
const checkout = require('../modules/checkout');
const pagamento = require('../modules/pagamento');
const fluxos = require('../modules/fluxos');
const { gerarEmail } = require('../support/helpers');
const usuarioBase = require('../fixtures/usuario.json');
const pedido = require('../fixtures/pedido.json');

describe('Trabalho Final - Automation Exercise', () => {
  it('Caso de Teste 01: Deve registrar um novo usuário, exibir o usuário logado e excluir a conta', () => {
    const usuario = { ...usuarioBase, email: gerarEmail() };

    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    menu.irParaSignupLogin();
    cadastro.verificarSeFormularioNovoUsuarioEstaVisivel();

    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.verificarSeFormularioInformacoesContaEstaVisivel();

    cadastro.preencherCadastro(usuario);
    cadastro.criarConta();
    conta.verificarSeContaFoiCriada();

    conta.continuar();
    menu.verificarSeUsuarioEstaLogado(usuario.nome);

    fluxos.excluirContaLogada();
  });

  it('Caso de Teste 02: Deve fazer login com e-mail e senha corretos, exibir o usuário logado e excluir a conta', () => {
    const usuario = { ...usuarioBase, email: gerarEmail() };
    fluxos.criarUsuarioParaTeste(usuario);

    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    menu.irParaSignupLogin();
    login.verificarSeFormularioLoginEstaVisivel();

    login.fazerLogin(usuario.email, usuario.senha);
    menu.verificarSeUsuarioEstaLogado(usuario.nome);

    fluxos.excluirContaLogada();
  });

  it('Caso de Teste 03: Deve exibir erro ao fazer login com e-mail e senha incorretos', () => {
    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    menu.irParaSignupLogin();
    login.verificarSeFormularioLoginEstaVisivel();

    login.fazerLogin(gerarEmail('inexistente'), 'SenhaIncorreta@123');
    login.verificarSeMensagemLoginInvalidoFoiExibida();
  });

  it('Caso de Teste 04: Deve fazer logout e voltar para a página de login', () => {
    const usuario = { ...usuarioBase, email: gerarEmail() };
    fluxos.criarUsuarioParaTeste(usuario);

    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    menu.irParaSignupLogin();
    login.verificarSeFormularioLoginEstaVisivel();

    login.fazerLogin(usuario.email, usuario.senha);
    menu.verificarSeUsuarioEstaLogado(usuario.nome);

    menu.fazerLogout();
    login.verificarSePaginaDeLoginFoiExibida();

    // Limpeza: exclui a conta criada para o teste
    login.fazerLogin(usuario.email, usuario.senha);
    fluxos.excluirContaLogada();
  });

  it('Caso de Teste 05: Deve exibir erro ao cadastrar um usuário com e-mail já existente', () => {
    const usuario = { ...usuarioBase, email: gerarEmail() };
    fluxos.criarUsuarioParaTeste(usuario);

    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    menu.irParaSignupLogin();
    cadastro.verificarSeFormularioNovoUsuarioEstaVisivel();

    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.verificarSeMensagemEmailExistenteFoiExibida();

    // Limpeza: exclui a conta criada para o teste
    login.fazerLogin(usuario.email, usuario.senha);
    fluxos.excluirContaLogada();
  });

  it('Caso de Teste 08: Deve listar todos os produtos e exibir os detalhes do primeiro produto', () => {
    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    menu.irParaProdutos();
    produtos.verificarSeListaDeProdutosEstaVisivel();

    produtos.abrirPrimeiroProduto();
    produtos.verificarSeDetalhesDoProdutoEstaoVisiveis();
  });

  it('Caso de Teste 09: Deve pesquisar um produto e exibir os produtos encontrados', () => {
    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    menu.irParaProdutos();
    produtos.verificarSeListaDeProdutosEstaVisivel();

    produtos.buscarProduto(pedido.busca);
    produtos.verificarSeProdutosBuscadosEstaoVisiveis();
  });

  it('Caso de Teste 10: Deve se inscrever na newsletter pelo rodapé da página inicial e exibir mensagem de sucesso', () => {
    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    rodape.rolarAteRodape();
    rodape.verificarSeTituloInscricaoEstaVisivel();

    rodape.inscreverEmail(gerarEmail());
    rodape.verificarSeInscricaoFoiRealizada();
  });

  it('Caso de Teste 15: Deve se cadastrar antes do checkout, finalizar o pedido e excluir a conta', () => {
    const usuario = { ...usuarioBase, email: gerarEmail() };

    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    menu.irParaSignupLogin();
    cadastro.cadastrarUsuario(usuario);
    conta.verificarSeContaFoiCriada();
    conta.continuar();
    menu.verificarSeUsuarioEstaLogado(usuario.nome);

    produtos.adicionarProdutosAoCarrinho(pedido.produtos);
    menu.irParaCarrinho();
    carrinho.verificarSeCarrinhoEstaVisivel(pedido.produtos.length);

    carrinho.prosseguirParaCheckout();
    checkout.verificarSeDetalhesDoPedidoEstaoVisiveis(usuario.endereco, pedido.produtos.length);

    checkout.fazerPedido(pedido.comentario);
    pagamento.pagarEConfirmarPedido(pedido.cartao);
    pagamento.verificarSePedidoFoiConfirmado();

    fluxos.excluirContaLogada();
  });

  it('Caso de Teste 16: Deve fazer login antes do checkout, finalizar o pedido e excluir a conta', () => {
    const usuario = { ...usuarioBase, email: gerarEmail() };
    fluxos.criarUsuarioParaTeste(usuario);

    home.acessarHome();
    home.verificarSeHomeEstaVisivel();

    menu.irParaSignupLogin();
    login.fazerLogin(usuario.email, usuario.senha);
    menu.verificarSeUsuarioEstaLogado(usuario.nome);

    produtos.adicionarProdutosAoCarrinho(pedido.produtos);
    menu.irParaCarrinho();
    carrinho.verificarSeCarrinhoEstaVisivel(pedido.produtos.length);

    carrinho.prosseguirParaCheckout();
    checkout.verificarSeDetalhesDoPedidoEstaoVisiveis(usuario.endereco, pedido.produtos.length);

    checkout.fazerPedido(pedido.comentario);
    pagamento.pagarEConfirmarPedido(pedido.cartao);
    pagamento.verificarSePedidoFoiConfirmado();

    fluxos.excluirContaLogada();
  });
});
