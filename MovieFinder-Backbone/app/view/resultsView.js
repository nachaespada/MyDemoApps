define([
  'jquery',
  'backbone',
  'collection/movieCollection'],

  function($, Backbone, Collection){
    var ResultsView = Backbone.View.extend({
      el: $('.content'),

      initialize: function() {
        this.collection = new Collection();
      },

      events: {
        'click a#btn-previous' : 'previousPage',
        'click a#btn-next' : 'nextPage'
      },

      nextPage: function() {
        if(this.collection.currentPage < this.collection.total / 10){
          this.collection.nextPage();
        }
      },

      previousPage: function() {
        if(this.collection.currentPage > 1){
          this.collection.previousPage();
        }
      }
    });
    return ResultsView;
});
