angular.module('contatooh').controller('ContatoController', function($scope, $routeParams, Contato){
  if($routeParams.contatoId){
    Contato.get({id: $routeParams.contatoId}, function(contato){
      $scope.contato = contato;
    }, function(error){
      $scope.mensagem = {
        texto: 'Contato não existe. Novo contato.'
      }
    });
  } else {
    $scope.contato = new Contato();
  }

  $scope.salva = function(){
    //save here
    $scope.contato.$save()
    .then(function(res){
      if(res.$promise){
          $scope.contato = res;
          $scope.mensagem = {texto: "Contato atualizado com sucesso!"};
      }else{
        $scope.contato = new Contato();
        $scope.mensagem = {texto: "Contato adicionado com sucesso!"};
      }

      //$scope.btnBackFocus = true; //adiciona focu ao botao voltar através da diretiva meuFocus
      $scope.$broadcast('contatoSalvo');
    }).catch(function(error){
      $scope.mensagem = {texto: 'Não foi possível salvar'};
    });
  }

  Contato.query(function(contatos){
    $scope.contatos = contatos;
  });
});
