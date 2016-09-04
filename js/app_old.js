// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic', 'ngCordova'])



.controller('imageController', function($scope, $cordovaCamera, $cordovaFile) {
// 1
  $scope.images = [];
   
  $scope.addImage = function() {
   // 2
   var options = {
   destinationType : Camera.DestinationType.FILE_URI,
   sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
   allowEdit : false,
   encodingType: Camera.EncodingType.JPEG,
   popoverOptions: CameraPopoverOptions,
   };
   
   // 3
   $cordovaCamera.getPicture(options).then(function(imageData) {
   
   // 4
   onImageSuccess(imageData);
   
   function onImageSuccess(fileURI) {
   createFileEntry(fileURI);
   }
   
   function createFileEntry(fileURI) {
   window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
   }
   
   // 5
   function copyFile(fileEntry) {
   var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
   var newName = makeid() + name;
   
   window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
   fileEntry.copyTo(
   fileSystem2,
   newName,
   onCopySuccess,
   fail
   );
   },
   fail);
   }
   
   // 6
   function onCopySuccess(entry) {
   $scope.$apply(function () {
   $scope.images.push(entry.nativeURL);
   });
   }
   
   function fail(error) {
   console.log("fail: " + error.code);
   }
   
   function makeid() {
   var text = "";
   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   
   for (var i=0; i < 5; i++) {
   text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
   }
   
   }, function(err) {
   console.log(err);
   });
  }
  $scope.urlForImage = function(imageName) {
  var name = imageName.substr(imageName.lastIndexOf('/') + 1);
  var trueOrigin = cordova.file.dataDirectory + name;
  return trueOrigin;
}
});

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic', 'ngCordova','ngStorage'])



.controller('CameraCtrl', function ($scope, $cordovaCamera, $ionicLoading, $localStorage) {
  $scope.data = { "ImageURI" :  "Select Image" };
    $scope.takePicture = function() {
    var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URL,
        sourceType: Camera.PictureSourceType.CAMERA
      };
    $cordovaCamera.getPicture(options).then(
    function(imageData) {
      $scope.picData = imageData;
      $scope.ftLoad = true;
      $localStorage.set('fotoUp', imageData);
      $ionicLoading.show({template: 'Foto acquisita...', duration:500});
    },
    function(err){
      $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
      })
    }

    $scope.selectPicture = function() { 
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };

    $cordovaCamera.getPicture(options).then(
    function(imageURI) {
      window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
        $scope.picData = fileEntry.nativeURL;
        $scope.ftLoad = true;
        var image = document.getElementById('myImage');
        image.src = fileEntry.nativeURL;
        });
      $ionicLoading.show({template: 'photo loading...', duration:500});
    },
    function(err){
      $ionicLoading.show({template: 'completed!', duration:500});
    })
  };

    $scope.uploadPicture = function() {
    $ionicLoading.show({template: 'Start photo upload...'});
    var fileURL = $scope.picData;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;

    var params = {};
    params.value1 = "someparams";
        params.value2 = "otherparams";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://www.walequadri.com/nysc/upload.php"), viewUploadedPictures, function(error) {$ionicLoading.show({template: 'Errore di connessione...'});
    $ionicLoading.hide();}, options);
    }

  var viewUploadedPictures = function() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.walequadri.com/nysc/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {          
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
          return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
    $ionicLoading.hide();
    }

  $scope.viewPictures = function() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.walequadri.com/nysc/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {          
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
          return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
    $ionicLoading.hide();
    }
})
