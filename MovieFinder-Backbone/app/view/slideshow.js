define([
  'jquery',
  'backbone',
  'libs/bootstrap/js/bootstrap',
  'text!templates/slideshow.html'],

  function($, Backbone, Bootstrap ,Template){
    var slideView = Backbone.View.extend({
      el: $('.slideshow'),

      initialize: function(){
        // Nothing here
      },

      render: function(){
        this.el.html( Template );
        this.el.carousel();
      }
    });
    return slideView;
  });
