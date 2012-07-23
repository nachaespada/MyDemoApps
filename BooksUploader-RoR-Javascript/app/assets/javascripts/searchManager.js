/**
/**
 * Upload Manager Module
 * @author Natacha Espada <natacha.espada@globant.com>
 *----------------------------------------------------------------------------*/

var SearchManager = (function() {
  var public_methods = {
    // events method
    events: function() {
      var sendButton = $('#search-book'),
          book = $('.thumbnail');
      sendButton.on({
  	    click: function() {
          BooksCollection.search($('.input').val());
  	    }
  	  });
      book.on({
        click: function() {
          var id = $(this).attr('id');
          BooksCollection.showBookPreview(id);
        }
      })
    }
  };
  // returning
  return public_methods;
}());
