define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/login/login.html',
  'models/user'
], function($, _, Backbone, loginTemplate, UserModel){
  var LoginView = Backbone.View.extend({
    el: '.login',

    render: function () {
      $(this.el).html(loginTemplate);

    },
    events: {
      'click .btn-login': 'login',
      'click .btn-register': 'postUser'
    },

    postUser: function() {
			var that = this;
      var user = new UserModel();
      var data = {
				user: $('.user').val(),
				password: $('.pass').val()
			};

      user.save(data, {
        success: function () {
          that.trigger('postUser');
        }
      });
    },

    login: function() {
			var that = this;
			jQuery.ajax({
				url: '/users',
				type: "POST",
				data: {
					user: $('.user').val(),
					password: $('.pass').val()
				},
				success: function(results) {
					console.log(results);
					if(results.user) {
						that.trigger('login');
						localStorage.setItem('user', $('.user').val());
						$('.login-box').addClass('hidden');
					}
				}
			});
    }

  });
  return LoginView;
});
