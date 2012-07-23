define([
  'jquery',
  'backbone',
  'text!templates/movie.html',
  'mediator'
],

  function($,Backbone, MovieTemplate, Madiator){
    var MovieView = Backbone.View.extend({

      el: $('.content'),

      initialize: function(options) {
         this.event = options.event;
         this.model = options.model;
      },

      events: {
        'click .btn-more-info' : 'showMoreInfo'
      },

      showMoreInfo: function(e) {
        if($(e.target).attr('id') == this.model.id)
          Madiator.events().trigger('moreInfo', this.model);
      },

      render: function() {
        var data = {
          info: this.model.toJSON()
        };
        var template = Mustache.to_html( MovieTemplate, data);
        $('.movies-wrapper').append( template );
      }
    });
    return MovieView;
});
