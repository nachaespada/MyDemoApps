define([
  'backbone'
], function(Backbone){

  var Movie = Backbone.Model.extend({
    initialize: function() {
    },
    defaults: {
      id: '',
      title: '',
      actors: '',
      genre: '',
      thumbnail: '',
      synopsis: '',
      moreInfo: {
        rating: '',
        mpaa_rating: '',
        critics: '',
        characters: '',
        image: ''
      }
    }
  });
  return Movie;
});