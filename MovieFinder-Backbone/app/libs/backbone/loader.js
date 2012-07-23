define([
	'order!libs/jquery/jquery-1.7.1', 
	'order!libs/underscore/underscore-1.3.0.amdjs',
	'order!libs/backbone/backbone-0.5.3.amdjs'
], function(){
  return {
    Backbone: Backbone.noConflict(),
    _: _.noConflict(),
    $: jQuery.noConflict()
  };
});