// Filename: app.js
define([
	'underscore',
  'router',
	'backbone'],
  function(_,Router,Backbone){
    var initialize = function(){
      Router.initialize();
    };

    return {
      initialize: initialize
    };
});
