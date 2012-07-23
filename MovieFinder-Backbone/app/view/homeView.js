define([
'jquery',
'mustache',
'backbone',
'view/moviesByTitleView',
'text!templates/menu.html'],

function($, Mustache, Backbone, MoviesByTitleView, Template){
  var HomeView = Backbone.View.extend({
    
    el: $('.search'),
    
    initialize: function(){
    },

    events: {
      'click a#btn-search-title' : 'searchByTitle'
    },

    searchByTitle: function() {
      var name = $('#edit-name').val();
      name = name.replace(' ','+');
      var moviesByTitleView = new MoviesByTitleView();
      moviesByTitleView.searchByTitle(name);
    },

    render: function(){
      var template = Mustache.to_html( Template, {} );
      this.el.html( template );
    }
  });
  return HomeView;
});