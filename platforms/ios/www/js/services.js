angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

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
})

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
  })

.service('navService', function(LoginService) {
  this.isNavVisible = false;
  this.isBackVisible = true;

})


/* Flickr Search */
.service('Flickr', function($resource, $q) {
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
        })

        return q.promise;
      }
    }
  })


;


