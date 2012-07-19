define([
  'jquery',
  'underscore',
  'backbone',
  'collections/messages',
  'views/guestbook/message',
  'text!templates/guestbook/list.html'
], function($, _, Backbone, MessagesCollection, MessageView, guestbookListTemplate){
  var GuestbookList = Backbone.View.extend({

		el: '.guestbook-list-container',

    render: function (data) {
      var that = this;
      var messages = new MessagesCollection();
      messages.fetch({
        success: function(messages) {
					if(data) {
						var filteredMessages = new MessagesCollection();
						messages.filter(function(m) {
							if(m.get('author') === data.author) {
								filteredMessages.add(m);
							}
						});
						messages = filteredMessages;
					}
					$(that.el).html(_.template(guestbookListTemplate, {}));
          messages.each(function(m){
						var message = new MessageView({model: m});

						message.on('refresh', function () {
							that.render();
						});

						message.render();
					},this);
        }
      });
    }
  });
  return GuestbookList;
});
