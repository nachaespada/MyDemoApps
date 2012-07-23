define([
'jquery',
'mustache',
'backbone',
'text!templates/navigation.html',
'mediator'],

function($, Mustache, Backbone, Template, Mediator){
  var NavigationView = Backbone.View.extend({
    el: $('.nav'),
    initialize: function(){
    },

    events: {
      'click a#goto-home' : 'gotoHome'
    },

    gotoHome: function(){
      Mediator.events().trigger('goto-home');
    },

    render: function(){
      var template = Mustache.to_html( Template, {} );
      this.el.html( template );
    }
  });
  return NavigationView;
});
