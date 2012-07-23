define([
  'backbone',
  'underscore'
],

    function(Backbone, _){
      var Mediator = (function () {
          var instance;
          var events;

          function init() {

            return {

              initialize : function() {
                return this;
              },

              getEvents : function() {
                if(!events) {
                  events = _.extend({}, Backbone.Events);
                }
                return events;
              }
            };
          }

        return {
          events: function () {
            if ( !instance )
              instance = init();
            return instance.getEvents();
          }
        };
      })();
      return Mediator;
 });

