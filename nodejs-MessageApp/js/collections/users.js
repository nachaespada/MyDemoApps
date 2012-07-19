define([
  'jquery',
  'underscore',
  'backbone',
  'models/user'
], function($, _, Backbone, UserModel){
  var Users = Backbone.Collection.extend({
    model: UserModel,
		url: 'http://localhost:8080/users',
  });

  return Users;
});
