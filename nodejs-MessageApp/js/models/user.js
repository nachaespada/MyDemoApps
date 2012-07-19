define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var User = Backbone.Model.extend({
      url: 'http://localhost:8080/users'
  });
  return User;
});
