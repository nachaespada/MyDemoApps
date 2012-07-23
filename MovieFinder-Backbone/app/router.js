define([
  'backbone',
  'view/homeView',
  'view/moreInfoView',
  'view/navigationView',
  'view/moviesByTitleView',
  'view/latestMoviesView',
  'view/slideshow',
  'mediator'],
  function(Backbone, HomeView, MoreInfoView, NavigationView, MoviesByTitleView, LatestMoviesView, Slideshow,M){
    var AppRouter = Backbone.Router.extend({
      routes: {
        'search-title/:title': 'showResultsByTitle',
        '*actions': 'showMenu'
      },

      showResultsByTitle: function(title){
        var moviesByTitleView = new MoviesByTitleView();
        moviesByTitleView.searchByTitle(title);
      },

      showMenu: function(){
        var navigationView = new NavigationView();
        navigationView.render();
        var homeView = new HomeView();
        homeView.render();
        var slideView = new Slideshow();
        slideView.render();
        var latestMovieView = new LatestMoviesView();
        latestMovieView.search();
      }
    });

    var initialize = function(){
			var app_router = new AppRouter();
      var moreInfoView = new MoreInfoView();
      Backbone.history.start();
    };

    return {
      initialize: initialize
    };
});
