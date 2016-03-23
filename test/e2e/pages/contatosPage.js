var ContatosPage = function(){
  this.visitar = function(){
    browser.get('http://localhost:3000/#/contatos');
  };

  this.obterUsuarioLogado = function(){
    return element(by.css('#usuario-logado')).getText();
  };

  this.obterTotalDeItensDaLista = function(){
    return element.all(by.repeater('contato in contatos')).count();
  };

  this.removePrimeiroItemDaLista = function(){
    element(by.repeater('contato in contatos').row(0)).element(by.css('.btn')).click();
  };
}

module.exports = ContatosPage;
