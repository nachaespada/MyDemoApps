define([
  'jquery',
  'underscore',
  'backbone',
  'models/message'
], function($, _, Backbone, MessageModel){
  var Messages = Backbone.Collection.extend({
    model: MessageModel,
    //url: 'http://backbonetutorials.nodejitsu.com/messages'
		url: 'http://localhost:8080/messages',
  });

  return Messages;
});
