define([
  'backbone',
  'model/movie'
], function(Backbone, Movie){
  var MovieCollection = Backbone.Collection.extend({
    model: Movie,
    url: '',
    total: 0,
    currentPage: 1,

    initialize: function(){
    },

    setUrl: function(url) {
      this.url = url;
      this.total = 0;
    },

    parse : function(data){
      var res = [];
      var charactersList, actorsList;
      this.total = data.total;
      if(data.movies){
        for(var i=0; i<data.movies.length;i++) {
          charactersList = [];
          actorsList = [];
          var movie = data.movies[i];
          var names = '', characters = '';
          for(var j=0; j<movie.abridged_cast.length;j++) {
            actorsList.push({'actor': movie.abridged_cast[j].name});
            charactersList.push({'character': movie.abridged_cast[j].name + " (" + movie.abridged_cast[j].characters +")"});
          }
          res.push({
            id: movie.id,
            title : movie.title,
            synopsis : movie.synopsis,
            actors: actorsList,
            genre: movie.year,
            thumbnail: movie.posters.profile,
            moreInfo: {
              rating: movie.ratings.audience_score,
              mpaa_rating: movie.mpaa_ratings,
              critics: movie.critics_concensus,
              characters: charactersList,
              image: movie.posters.detailed
            }
          });
        }
      }
      return res;
    },

    fetch : function() {
      Backbone.Collection.prototype.fetch.call(this, {crossdomain: true, dataType: 'jsonp'});
    },

    nextPage : function() {
      this.url = this.url.replace('&page='+this.currentPage, '&page='+this.currentPage+1);
      this.currentPage++;
      this.fetch();
    },

    previousPage : function() {
      this.url = this.url.replace('&page='+this.currentPage, '&page='+this.currentPage-1);
      this.currentPage--;
      this.fetch();
    }
  });
  return MovieCollection;
});
