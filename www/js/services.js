angular.module('starter.services', [])

.factory('Docs', function($http) {
   return {
     all: function(callback) {
       $http.get('js/data/docs.js').success(callback);
     }
   }
})

.factory('Names', function($http) {
   return {
     all: function(callback) {
       $http.get('js/data/names.js').success(callback);
     }
   }
})

.factory('CameraService', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, { 
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI 
      });

      return q.promise;
    }
  }
}])

.factory('fileService', ['$q', function($q) {
  return {
    saveFile: function(filename, downloadlocation, callback) {

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile(filename, {create: true, exclusive: false},
          function(file_entry){
            var ft = new FileTransfer()
            ft.download(downloadlocation, file_entry.toURL(), function(fe){
              fe.file(function(f){
                alert(callback);

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
    },
    getFile: function(filename, fileLocation, callback) {

      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile('data_file', null,
            function(file_entry){

              file_entry.file(function(file){
                var reader = new FileReader();
                reader.onloadend = function(evt) {

                    alert(callback);

                    console.log(evt.target.result);
                    //$scope.docs = JSON.parse(evt.target.result);
                    //if (!$scope.$$phase) $scope.$apply()
                    //$scope.apply();
                };
                reader.readAsDataURL(file);
              })

            }
          )

      })

    }

  }
}]);







/*
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
*/