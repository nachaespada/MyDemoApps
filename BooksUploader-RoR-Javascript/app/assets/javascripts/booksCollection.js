var BooksCollection = (function() {

	var books = [];
  var limitPerPage = 8;
  var currentPage = 1;

  var addBook = function(params) {
    var book = new Book(params);

    books[params['id']] = book;
  };

  var addBooks = function(params) {
    var data, index;
    for(index in params) {
      data = params[index];
      addBook(data);
    }
  };

  var public_methods = {

    events: function() {
      var prevButton = $('li #prevButton'),
          nextButton = $('li #nextButton');
      prevButton.on({
        click: function() {
          alert("should display prev page");
        }
      });
      nextButton.on({
        click: function() {
          alert("should display next page");
        }
      })
    },

    init : function() {
      this.search();
    },

    search : function(data) {
      var fd = new FormData();
      fd.append('value',data);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/filter');
      var results;
      xhr.onreadystatechange = function () {
        if(xhr.readyState==4 && xhr.status==200 && !results){
          results = JSON.parse(xhr.response)['results'];
          addBooks(results);
          books['count'] = results.length;
          BooksCollection.showResults(results);
        }
      }
      xhr.send(fd);
    },

    showBookPreview : function(id) {
      var b = books[id];
      if(b)
        b.show();
    },

    showResults : function(data) {
      var promise = Loader.load('/html/booklist.html',this);
        promise.done(function(html){
          var view = {
            'results': data,
            'currentPage': currentPage,
            'pages' : Math.ceil((books['count'] / limitPerPage))
          };
          var template = Handlebars.compile(html);
          var content = template(view);
          $('#books-content').html(content);
          /*if(books['count'] <= limitPerPage) {
            $('.pagination').hide();
          }*/
          SearchManager.events();
          this.events();
      });
    }
  };

	return public_methods;

}());
