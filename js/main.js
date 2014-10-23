(function() {
  'use strict';

  var ViewModel = function() {
    var _this = this;
    this.isLoggedIn = ko.observable(false);
    this.login = function() {
      var self = this;
      this.loginErrorMessage(null);
      OAuthManager.obtainToken({
        scopes: [
          /*
            the permission for reading public playlists is granted
            automatically when obtaining an access token through
            the user login form
            */
            'user-read-private'
          ]
        }).then(function(token) {
          onTokenReceived(token);
        }).catch(function(error) {
          self.loginError(error);
        });
    };

    this.logout = function() {
      localStorage.removeItem(accessTokenKey);
      this.isLoggedIn(false);
    };

    this.loginError = function(errorCode) {
      switch (errorCode) {
        case 'access_denied':
          this.loginErrorMessage('You need to grant access in order to use this website.');
          break;
        default:
          this.loginErrorMessage('There was an error trying to obtain authorization. Please, try it again later.');
        }
    };

    this._audio = null;
    this._prev = null;
    this.play = function(e) {
      console.log(e);
      if (_this._audio === null) {
        _this._audio = new Audio(e.tracks.items[0].preview_url);
      } else {
        _this._prev && _this._prev.isSelected(false);
        _this._audio.pause();
        _this._audio.src = e.tracks.items[0].preview_url
      }

      if (_this._prev !== null && _this._prev.id === e.id) {
        _this._audio.pause();
        e.isSelected(false);
        _this._prev = null;
      } else {
        _this._audio.play();
        e.isSelected(true);
        _this._prev = e;
      }
    };

    this.loginErrorMessage = ko.observable(null);

    this.user = ko.observable(null);

    this.albums = ko.observableArray();

    this.loadNextPage = loadNextPage;

  };

  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);

  var spotifyApi = new SpotifyWebApi(),
      accessTokenKey = 'sp-access-token';

  function onTokenReceived(token) {
    viewModel.isLoggedIn(true);
    localStorage.setItem(accessTokenKey, token);

    // do something with the token
    spotifyApi.setAccessToken(token);
    spotifyApi.getMe().then(function(data) {
      viewModel.user(data);
      loadNextPage();
    }).catch(function (e) {
      if (e.status === 401) {
        viewModel.logout();
      }
    });
  }

  var currentPage = 0;
  function loadNextPage() {
    var pageSize = 20;
    var country = viewModel.user().country;
    spotifyApi.getNewReleases({country: country, offset: currentPage * pageSize, limit: pageSize})
      .then(function(data) {
        currentPage++;
        var ids = data.albums.items.map(function(i) { return i.id; });
          spotifyApi.getAlbums(ids).then(function(albums) {
            albums.albums.forEach(function(album) {
              if (album !== null) {
                album.isSelected = ko.observable(false);
                viewModel.albums.push(album);
              }
            });
          });
        });
  }

  /**
   * Uses the stored access token
   */
  function initAccessToken() {
    var storedAccessToken = localStorage.getItem(accessTokenKey);
    if (storedAccessToken) {
      onTokenReceived(storedAccessToken);
    }
  }

  initAccessToken();

})();
