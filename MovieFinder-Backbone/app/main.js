require.config( {
  paths: {
    'backbone':'libs/backbone/backbone-0.5.3.amdjs',
    'mustache':'libs/mustache/mustache',
    'underscore':'libs/underscore/underscore-1.3.0.amdjs',
    'jquery':'libs/jquery/jquery-1.7.1',
    'mediator':'mediator'
  },
  baseUrl: 'app'
});

require(
  [
  'app'
  ],
  function(app) {
    app.initialize();
  }
);