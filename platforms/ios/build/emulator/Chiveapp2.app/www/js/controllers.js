angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.message = "Hi";
})

.controller('ChatsCtrl', function($scope, Chats) {
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

.controller('AccountCtrl', function($scope, $sce) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.emailLink = $sce.trustAsHtml('<a class="ion-android-mail dark" href="mailto:?subject=Check out ChiveApp new app on the app store!&amp;body=You can upload photos, tag your location! Type in locations to search up other photos in different areas. To download the app you can head over to (insert url here)"> Share via e-mail </a>');
  $scope.twitterLink = $sce.trustAsHtml('<a class="ion-social-twitter positive" href="http://twitter.com/share?text=I am using ChiveApp, you can download it here at (URL). Where are you in the world &amp;hastags=ChiveApp&url=(URL)"> <span class="dark">Share via Twitter</span> </a>');

})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
  $scope.data = {};

  $scope.login = function() {
    LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
      $state.go('tab.dash');
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials',
        okType: 'button-assertive', // Appears red to inidicate error
      });
    });
  }
})

.controller('RegisterCtrl', function($scope, $ionicPopup, $state) {
  $scope.register = function() {

      $state.go('register');
      var alertPopup = $ionicPopup.alert({
        title: 'Instructions',
        template: 'Please enter all of your details',
        okType: 'button-energized', // Appears orange to inidicate prompt
      });
  }
})

/* .controller('HomeCtrl', function($scope) {
  $scope.displayItem = false;
  $scope.display = function (x) {

    if (x === 'on'){
      $scope.displayItem = true;
    }
    else if (x === 'off'){
      $scope.displayItem = false;
    }
  };

}) */
//I was using this code for the home controller found using a service for this worked better


.controller('RootCtrl', ['$scope', 'navService',
    function($scope, navService) {
      $scope.navService = navService;
    }
  ])


.controller('HomeCtrl', ['$scope', 'navService',
    function($scope, navService) {
      $scope.displayNav = function(x) {
        if (x === 'on') {
          navService.isNavVisible = true;

        } else if (x === 'off') {
          navService.isNavVisible = true;
        }
      }
    }
  ])

.controller('FlickrCtrl', function($scope, Flickr) {

    var doSearch = ionic.debounce(function(query) {
      Flickr.search(query).then(function(resp) {
        $scope.photos = resp;
      });
    }, 500);

    $scope.search = function() {
      doSearch($scope.query);
    };

    $scope.testmessage = "Hello from flickr controller";

  })



/*doing test on intro part may in future get rid of this */
.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
    // Called to navigate to the main app
    $scope.startApp = function() {
      $state.go('home');
    };
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };

    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
  })



;

