var Book = function(params) {

	var id = params['id'],
			title = params['title'],
			author = params['author'],
			description = params['description'],
      labels = params['labels'];

	var showBook = function(){
		var promise = Loader.load('/html/bookPreview.html',this);
      promise.done(function(html){
        var view = {
          'title': title,
          'author': author,
          'description': description,
          'labels': labels
        };
        var template = Handlebars.compile(html);
        var content = template(view);
        $('.pagination').hide();
        $('#books-content').html('');
        $('.libraryTop').html(content);
        for(var i=1; i< 5;i++) {
          $('#magazine').append('<img src="/images/books/' + i + '.png"/>' );
        }
        $('#magazine').show();
        $('#magazine').turn({height:"800px", width:"1000px"});
    });
	}

	return {
		show: showBook
	}

}
