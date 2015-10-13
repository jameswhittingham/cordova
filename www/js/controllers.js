angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {

})

.controller('NamesCtrl', function($scope, Names) {

  $scope.droppedObjects1 = [];
  $scope.droppedObjects2= [];

  Names.all(function(data){
    $scope.draggableObjects = data.names;
  });


  $scope.itemRemoved = function(id, direction){
    var item = $scope.draggableObjects[id];
    var dragIndex = $scope.draggableObjects.indexOf(item);

    if(direction == 'left') {
      $scope.droppedObjects1.push(item);
    } else {
      $scope.droppedObjects2.push(item);
    }
    $scope.draggableObjects.splice(dragIndex, 1);
    $scope.$apply();
  }


  /*$scope.droppedObjects1 = [];
  $scope.droppedObjects2= [];

  $scope.onDropComplete1=function(data,evt){
    var index = $scope.droppedObjects1.indexOf(data);
    var dragIndex = $scope.draggableObjects.indexOf(data);
    if (index == -1) {
      $scope.droppedObjects1.push(data);  
    }

    if (dragIndex > -1) {
      $scope.draggableObjects.splice(dragIndex, 1);
    }
  }

  $scope.onDropComplete2=function(data,evt){
    var index = $scope.droppedObjects2.indexOf(data);
    var dragIndex = $scope.draggableObjects.indexOf(data);
    if (index == -1) {
      $scope.droppedObjects2.push(data);
    }

    if (dragIndex > -1) {
      $scope.draggableObjects.splice(dragIndex, 1);
    }
  }

  var inArray = function(array, obj) {
      var index = array.indexOf(obj);
  }*/
})

.controller('DocsCtrl', function($scope, Docs) {
  Docs.all(function(data){
    $scope.docs = data;
  });

  $scope.selectedFilter = "Filter";
  $scope.updateFilter = function(val){
    $scope.selectedFilter = val;
  }

  $scope.goToLink = function (url) {
    window.open(url,'_blank');
  }
})

/*.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
*/
