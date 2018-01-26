angular.module('starter.services', [])

.factory('Chats', function() {
  // Will use a resource here that returns a JSON array in similiar approach

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
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
}) //chats

  //This is untouched from the temp ^^^


/* Flickr Search */

//Template which I didn't use I want to use a similiar approach in the future
.factory('Flickr', function($resource, $q) {
    var photosPublic = $resource('http://api.flickr.com/services/feeds/photos_public.gne',
      { format: 'json', jsoncallback: 'JSON_CALLBACK' },
      { 'load': { 'method': 'JSONP' } });

    return {
      search: function(query) {
        var q = $q.defer();
        photosPublic.load({
          tags: query
        }, function(resp) {
          q.resolve(resp);
        }, function(err) {
          q.reject(err);
        });

        return q.promise;
      }
    }
})// Flickr

/* Login service */

// Old testing service for verifying users I used this instead of the new Authenticastion
.service('LoginService', function($q) {

  return {
      loginUser: function(uName, uPass) {
        var deferred = $q.defer();
        var promise = deferred.promise;

        if (uName == 'user' && uPass == 'secret') { <!-- some def values which are user and secret -->
          deferred.resolve('Welcome ' + uName + '!');
        } else {
          deferred.reject('Wrong credentials.');
        }
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        };
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        };
        return promise;
      }
    }
  }) //LoginService

/* Navigation service */
//Sets navigation display to false triggers in controller via home - display()
.service('navService', function(LoginService) {
  this.isNavVisible = false;
  /* this.isBackVisible = true; */ //There is a built in function which ionic has which deals with this

})

//AUTHENTICATION FACTORY
.factory('Authentication',
    ['$rootScope', '$state', '$firebaseObject', '$firebaseAuth',
      function($rootScope, $state, $firebaseObject, $firebaseAuth) {

        var ref = firebase.database().ref();
        var auth = $firebaseAuth();
        var myObject;

        auth.$onAuthStateChanged(function(authUser) {
          if(authUser) {
            var userRef = ref.child('users').child(authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
          } else {
            $rootScope.currentUser = '';
          }
        });

        //Login function
        myObject = {
          login: function(user) {
            auth.$signInWithEmailAndPassword(
              user.email,
              user.password
            ).then(function(user) {
              $state.go('tab.dash');
            }).catch(function(error) {
              $rootScope.message = error.message;
            }); //signInWithEmailAndPassword
          }, //login


          //Logout function
          logout: function() {
            return auth.$signOut();
          }, //logout

          requireAuth: function() {
            return auth.$requireSignIn();
          }, //require Authentication


          //Register function
          register: function(user) {
            auth.$createUserWithEmailAndPassword(
              user.email,
              user.password
            ).then(function(regUser) {
              var regRef = ref.child('users')
                .child(regUser.uid).set({
                  date: firebase.database.ServerValue.TIMESTAMP,
                  regUser: regUser.uid,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email
                }); //userinfo
              myObject.login(user);
            }).catch(function(error) {

              $rootScope.message = error.message;
            }); //createUserWithEmailAndPassword
          } //register

        }; //return


        return myObject;

}]) //factory


; //starter.service


