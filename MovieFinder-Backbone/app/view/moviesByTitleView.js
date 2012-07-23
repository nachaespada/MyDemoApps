define([
  'mustache',
  'view/resultsView',
  'text!templates/results.html',
  'mediator'],

  function(Mustache, ResultsView, Template, Mediator){

    var MoviesByTitleView = ResultsView.extend({

      initialize: function() {
        ResultsView.prototype.initialize();
        this.collection.bind('reset', this.render,this);
      },

      events: {
        'click .btn-more-info' : 'showMoreInfo'
      },

      showMoreInfo: function(e) {
        var id = $(e.target).attr('id');
        var m = this.collection.get(id);
        Mediator.events().trigger('moreInfo', m);
      },

      searchByTitle: function(name){
        this.collection.setUrl('http://api.rottentomatoes.com/api/public/v1.0/movies.json?page_limit=10&apikey=5xq9w7z2mp7a6cnchkfy52yd&page=1&q='+name);
        this.collection.fetch();
      },

      render: function() {
        var view = {
          movies: this.collection.toJSON(),
          total: this.collection.total,
          pageAmount: 'Page ' + this.collection.currentPage + ' of ' + Math.ceil((this.collection.total / 10))
        };
        var template = Mustache.to_html( Template, view);
        this.el.html( template );
      }
    });
    return MoviesByTitleView;
});
