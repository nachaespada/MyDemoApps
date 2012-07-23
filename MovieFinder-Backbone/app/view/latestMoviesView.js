define([
  'mustache',
  'view/resultsView',
  'view/movieView',
  'mediator',
  'text!templates/latestMovies.html'],

  function(Mustache, ResultsView, MovieView, Mediator, Template){

    var LastestMoviesView = ResultsView.extend({

      initialize: function() {
        ResultsView.prototype.initialize();
        this.collection.bind('reset', this.render,this);
        Mediator.events().bind('goto-home', this.restart,this);
      },

      restart: function() {
        Mediator.events().unbind('goto-home');
        this.initialize();
        this.search();
      },

      search: function() {
        this.collection.setUrl('http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?apikey=5xq9w7z2mp7a6cnchkfy52yd&page=1&page_limit=4');
        this.collection.fetch();
      },

      render: function() {
        var view = {
          movies:this.collection.toJSON()
        };
        var template = Mustache.to_html( Template, view);
        this.el.html( template );

        this.collection.each(function(model){
          var movieView = new MovieView({model: model, event: this.event});
          movieView.render();
        },this);
      }
    });
    return LastestMoviesView;
});
