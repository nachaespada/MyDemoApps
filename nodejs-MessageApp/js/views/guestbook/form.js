define([
  'jquery',
  'underscore',
  'backbone',
  'models/message',
  'text!templates/guestbook/form.html'
], function($, _, Backbone, MessageModel, guestbookFormTemplate){
  var GuestbookForm = Backbone.View.extend({
    el: '.guestbook-form-container',
    render: function () {
      $(this.el).html(guestbookFormTemplate);
      this.trigger('refresh');
    },
    events: {
			'click .logout': 'logout',
      'click .post-message': 'postMessage',
      'click .search-message': 'searchMessage',
      'click .all-messages': 'allMessages'
    },

    searchMessage: function() {
			this.trigger('filterMessage', {author: $('.filter').val()});
    },

    allMessages: function() {
			this.trigger('refresh');
    },

    logout: function() {
			this.trigger('logout');
    },

    postMessage: function() {
      var that = this;
      var message = new MessageModel();
      var data = {
				message: $('.message').val(),
				author: localStorage.getItem('user')
			};
      message.save(data, {
        success: function () {
          that.trigger('postMessage');
        }
      });
    }
  });
  return GuestbookForm;
});
