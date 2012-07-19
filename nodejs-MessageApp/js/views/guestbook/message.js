define([
  'jquery',
  'underscore',
  'backbone',
  'collections/messages',
  'text!templates/guestbook/message.html'
], function($, _, Backbone, MessagesCollection, messageTemplate){
  var MessageView = Backbone.View.extend({

		initialize: function(options) {
       this.model = options.model;
    },

    el: '.guestbook-list-container',

    events: {
      'click .btn-delete': 'deleteMessage',
      'click .btn-update': 'update'
    },

    deleteMessage: function(e) {
			var id = $(e.target.parentNode).attr('id');
			if(id === this.model.get('_id')) {
				jQuery.ajax({
					url: '/messages/'+ id,
					type: "DELETE",
					data: {
						id: id
					}
				});
				this.trigger('refresh');
      }
    },

    saveMessage: function(id) {
			var that = this;
			jQuery.ajax({
				url: '/messages/'+ id,
				type: "PUT",
				data: {
					id: id,
					message: $('#message'+id).val(),
					author: this.model.get('author')
				},
				success: function () {
					that.trigger('refresh');
				}
			});
    },

		update: function(e) {
			var id = $(e.target.parentNode).attr('id');
			if(id === this.model.get('_id')){
				if($(e.target).attr('value') === 'Update') {
					$('#message'+id).removeAttr('readonly');
					$(e.target).attr('value','Save');
				}
				else {
					this.saveMessage(id);
					$(e.target).attr('value','Update');
					$('#message'+id).attr("readonly", "readonly");
				}
			}
    },

    render: function (data) {
      var view = {
				message: this.model.toJSON(),
				currentUser: localStorage.getItem('user'),
				_:_
			};
      $('.messages-wrapper').append(_.template(messageTemplate, view));
    }
  });
  return MessageView;
});
