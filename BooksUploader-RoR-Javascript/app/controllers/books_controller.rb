class BooksController < ApplicationController
  before_filter :require_login  #, :only => [:browse, :show]
  #fake login with guest
  def require_login
    if (session[:userId] == nil) || (session[:userId].to_s != params[:id])
      user = User.where(:username => 'guest').first
      session[:userId] = user.id
      puts "User guest in session #{session[:userId]}"
    end
  end

  # GET /books
  # GET /books.json
  def index
    @user = User.find(session[:userId])
    @books = @user.books
    puts "Libros de #{@user.username} #{@user.id}  #{@user.books}"
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @books }
    end
  end

  # GET /books/search
  # GET /books/search.json
  def search
    @user = User.find(session[:userId])
    @book = Book.new
    respond_to do |format|
      format.html # search.html.erb
      #format.json { render json: @book }
    end
  end

  # GET /books/1
  # GET /books/1.json
  def show
    @user = User.find(session[:userId])
    @book = Book.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @book }
    end
  end

  # GET /books/new
  # GET /books/new.json
  def new
    @book = Book.new
    @user = User.find(session[:userId])
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @book }
    end
  end

  # GET /books/1/edit
  def edit
    @book = Book.find(params[:id])
    @user = User.find(session[:userId])
  end

  def filter
    puts "in filter!!! #{params}"
    if(params[:value] != "undefined")
      results = Book.search(params[:value])
    else
      results = Book.all;
    end
    respond_to do |format|
      format.js { render json:{ results: results } }
    end
  end

  # Create or update a book in mongoDB
  # This method also split the PDF file in several images to be
  # used in some preview functionality.
  # Return a JSON object containing the bookId
  # POST /create
  def create
    puts "in create!!! #{params}"
    bookId = params[:book][:id];
    @book = BookService.save_or_update(params[:book][:file],
      bookId,
      params[:book][:title],
      params[:book][:description],
      params[:book][:labels],
      params[:book][:author],
      session[:userId])
    respond_to do |format|
      format.js { render json: { book: @book } }
    end
  end

  # PUT /books/1
  # PUT /books/1.json
  def update
    @book = Book.find(params[:id])

    respond_to do |format|
      if @book.update_attributes(params[:book])
        format.html { redirect_to @book, notice: 'Book was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1
  # DELETE /books/1.json
  def destroy
    @book = Book.find(params[:id])
    FileUtils.remove_dir("public/pdfs/Books", true)
    @book.destroy
    respond_to do |format|
      format.html { redirect_to user_books_path(session[:userId]) }
      format.json { head :no_content }
    end
  end

  def browse
    redirect_to user_books_path(session[:userId])
  end

  def upload
    puts "in upload!!! #{params}"
    if(params[:bookId] != "")
      @book = Book.find(params[:bookId])
    else
      @book = Book.new()
    end
    @book.save
    file = params[:file]
    if file.blank?
      return
    end
    dir = "public/pdfs/#{@book.id}"
    copy_file_to(dir, file)
    respond_to do |format|
      format.js { render json:{ bookId: @book.id } }
    end
  end
end