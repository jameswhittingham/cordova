angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {

})

.controller('rootController', function($scope) {

  $scope.user = {
    firstName: '',
    lastName: '',
    phone: '',
    image: ''
  }

  $scope.download = function() {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
      console.log("request");

      fileSystem.root.getFile('data_file', {create: true, exclusive: false},
          function(file_entry){
              console.log("entry");

              var ft = new FileTransfer()
              ft.download("http://clients.radarsydney.com/data/docs.js", file_entry.toURL(), function(fe){
                  console.log("downloaded");

                  alert('Data downloaded!');

                  fe.file(function(f){
                      console.log("file");

                      reader = new FileReader()
                      reader.onloadend = function(ev){
                          console.log('READ!', ev.target.result)
                      }
                      reader.readAsText(f)
                  })
              })
          }
      )
    })
  }

  $scope.load = function() {

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
      console.log("request");

      fileSystem.root.getFile('data_file', null,
          function(file_entry){
            console.log("entry");

            file_entry.file(function(file){
              var reader = new FileReader();
              reader.onloadend = function(evt) {
                  alert('Read downloaded data');
                  console.log(evt.target.result);
                  $scope.docs = JSON.parse(evt.target.result);
                  if (!$scope.$$phase) $scope.$apply()
                  //$scope.apply();
              };
              reader.readAsText(file);
            })

          }
        )

    })
  }

  $scope.delete = function() {
      console.log("delete");
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        console.log("request");

        fileSystem.root.getFile('data_file', null,
            function(file_entry){
              console.log("entry");

              file_entry.remove(function(){
                console.log("file removed");
                alert('Data removed')

                $scope.docs = "";
                if (!$scope.$$phase) $scope.$apply()
              })

            }
          )

      })


  }

})



.controller('SettingsCtrl', function($scope, CameraService) {

  $scope.getPhoto = function() {
    CameraService.getPicture({saveToPhotoAlbum: true}).then(function(imageURI) {
      console.log(imageURI);
      $scope.user.image = imageURI;
    }, function(err) {
      console.err(err);
    });
  }

  $scope.getUser = function() {
    var localuser = window.localStorage['user'];
    console.log(localuser);
    $scope.user = JSON.parse(localuser || '{}');
  }

  $scope.saveProfile = function() {
    window.localStorage['user'] = JSON.stringify($scope.user);
  }

  $scope.getUser();
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

})







.controller('DocsCtrl', function($scope, Docs) {
  if (!$scope.docs) {
    Docs.all(function(data){
      $scope.docs = data;
    });
  }

  $scope.selectedFilter = "Filter";
  $scope.updateFilter = function(val){
    $scope.selectedFilter = val;
  }

  $scope.goToLink = function (url) {
    window.open(url,'_blank', 'location=yes');
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
