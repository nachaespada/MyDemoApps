define([
  'jquery',
  'mustache',
  'underscore',
  'backbone',
  'text!templates/moreInfo.html',
  'mediator'],

function($, Mustache, _, Backbone, Template, Mediator){
  var MoreInfoView = Backbone.View.extend({
    el: $('.content'),

    initialize: function() {
      _.bindAll(this, 'showMore');
      // to ensure that the showMore method is executed in the correct context(this).

      Mediator.events().bind('moreInfo', this.showMore);
    },

    events: {
      'click a#btn-goback' : 'goBack'
    },

    goBack: function() {
      Mediator.events().trigger('goto-home');
    },

    showMore: function(model){
      this.model = model;
      this.render();
    },

    render: function() {
      var data = {
        info: this.model.toJSON()
      };
      var template = Mustache.to_html( Template, data);
      this.el.html( template );
      return this;
    }
  });
  return MoreInfoView;
});
