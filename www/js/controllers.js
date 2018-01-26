angular.module('starter.controllers', [])


//TUTORIAL CONTROLLER

/* This is a small user manual to display some of the basic functionalities of the application */
.controller('TutorialCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
    // Called to navigate to the main application page
    $scope.startHome = function() {
      $state.go('home');
    };
    //This is the section I am working on which is for the next button for the next slide on the tutorial page.
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
    //Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };
})



//ROOT CONTROLLER

/* This is a small controller which is used by the index */
.controller('RootCtrl', ['$scope', 'navService',
    function($scope, navService) {
      $scope.navService = navService;
    }
])


//HOME CONTROLLER

.controller('HomeCtrl', ['$scope', 'navService',
    //A SMALL CONDITIONAL FUNCTION FOR WHEN THE APPLICATION STARTS WAS CREATED TO DEAL WITH NAVIGATION ERROR
    function($scope, navService) {
      //DISPLAYS HEADER WHEN BUTTON IS CLICKED
      $scope.displayNav = function(x) {
        if (x === 'on') {
          navService.isNavVisible = true;

        } else if (x === 'off') {
          navService.isNavVisible = false;
        }
      }
    }
])




//LOGIN CONTROLLER
//Working on transferring some of this code into the registration controller to optimise performance "DRY"
.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {

  $scope.message = "";

  $scope.user = {};

    $scope.loginPage = function() {
      LoginService.loginUser($scope.user.username, $scope.user.password).success(function(user) {
        $state.go('tab.dash');
      }).error(function(user) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials',
          okType: 'button-assertive' // Appears red to inidicate error
        });
      });
    };

  //Pop up to prompt the user to enter all of there details
  $scope.registerPage = function() {
    $state.go('register'); //page which this goes to
    var alertPopup = $ionicPopup.alert({
      title: 'Instructions',
      template: 'Please enter all of your details',
      okType: 'button-energized' // Appears orange to inidicate prompt
    });
  };
})


//REGISTRARTION CONTROLLER

.controller('RegisterCtrl', function($scope, Authentication, $ionicPopup) {
  $scope.user = {};

  $scope.login = function() {
    Authentication.login($scope.user);
  };

  $scope.logout = function() {
    Authentication.logout();
  };

  $scope.register = function() {
    Authentication.register($scope.user);
  }; //register

})


//DASHBOARD CONTROLLER

.controller('DashCtrl',['$scope', '$http', function($scope, $http) {


  $scope.message = "Welcome";
  $scope.searchPlaceholder = "Type in location here";
  $scope.imageName = "img/instructions.jpg";
  $scope.testmessage = "Search for the location";


  $scope.images = [];
  var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne";


  $scope.loadImages = function() {
    for(var i = 0; i < 100; i++) {

      //THIS IS THE EXAMPLE FOR USING AN EXTERNAL WEBSITE
      //$scope.images.push({id: i, src: "http://placehold.it/150x150"});
      $scope.images.push({id: i, src: "img/instructions.jpg"});

    }
  };
}])


//FLICKR CONTROLLER **not used** Although will be working from this template

/* Extra functionality for the main dashbaord by the main dashboard */
.controller('FlickrCtrl', function($scope, Flickr) {

    var doSearch = ionic.debounce(function(query) {
      Flickr.search(query).then(function(resp) {
        $scope.photos = resp;
      });
    }, 500);

    $scope.search = function() {
      doSearch($scope.query);
    };

    //test to reach if I was reaching this controller
    $scope.testmessage = "Hello from flickr controller";

})


//CHAT CONTROLLER REPLACED FOR STAR ITEMS IN FUTURE

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


//CHAT DETAILS CONTROLLER REPLACING WITH IMAGE DETAILS WITH THE NAME:DESCRIPTION...

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


//ACCOUNT CONTROLLER

.controller('AccountCtrl', function($scope, $sce, $state) {
  $scope.settings = {
    enableFriends: false
  };
  $scope.emailLink = $sce.trustAsHtml('<a class="ion-android-mail dark" href="mailto:?subject=Check out ChiveApp new app on the app store!&amp;body=You can upload photos, tag your location! Type in locations to search up other photos in different areas. To download the app you can head over to (insert url here)"> Share via e-mail </a>');
  $scope.twitterLink = $sce.trustAsHtml('<a class="ion-social-twitter positive" href="http://twitter.com/share?text=I am using ChiveApp, you can download it here at (URL). Where are you in the world &amp;hastags=ChiveApp&url=(URL)"> <span class="dark">Share via Twitter</span> </a>');

  $scope.logout = function (){
    $state.go('home')
  };

})

;

