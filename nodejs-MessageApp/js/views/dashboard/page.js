define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'text!templates/guestbook/template.html',
  'views/guestbook/form',
  'views/guestbook/list',
  'views/login/login'
], function($, _, Backbone, Vm, guestbookTemplate, GuestbookFormView, GuestbookListView, LoginView){
  var DashboardPage = Backbone.View.extend({
    el: '.page',
    render: function () {
			var that = this;
      $(this.el).html(guestbookTemplate);

      var loginView = Vm.create(this, 'LoginView', LoginView);
      // Create new Backbone views using the view manager (does some extra goodies);
      if(localStorage.getItem('user') === ' ') {
				loginView.render();
			}
			else {
				that.renderHomePage();
			}
			loginView.on('login', function() {
				that.renderHomePage();
			});
			loginView.on('postUser', function() {
				that.render();
			});

    },

    renderHomePage: function() {
			var guestbookFormView, guestbookListView;
			var that = this;
			guestbookFormView = Vm.create(this, 'GuestbookFormView', GuestbookFormView);
			guestbookFormView.render();
			guestbookListView = Vm.create(this, 'GuestbookListView', GuestbookListView);
			guestbookListView.render();

			guestbookFormView.on('postMessage', function () {
				guestbookFormView.render();
			});

			guestbookFormView.on('refresh', function () {
				guestbookListView.render();
			});

			guestbookFormView.on('filterMessage', function (data) {
				guestbookListView.render(data);
			});

			guestbookFormView.on('logout', function () {
				localStorage.setItem('user',' ');
				that.render();
			});
    }
  });
  return DashboardPage;
});
