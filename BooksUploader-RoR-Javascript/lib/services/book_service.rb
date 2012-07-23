# @Author: Sebastián Groh
# @Date: 01/06/2012
#
# Service to perform all the operations related with a book.
# The main propose is maintain not fat controllers and povide
# methods to perform some extra bussines logic i.e: extract
# images from the PDF file.
#
class BookService

  def self.save_or_update(afile, bookId, title, description, labels, author, userId)
    if( bookId != "" )
      @book = Book.find(bookId)
    else
      @book = Book.new()
    end
    @book.title = title;
    @book.description = description;
    @book.labels = labels;
    @book.author = author;
    @user = User.find(userId)
    @book.user = @user

    file = afile

    if !file.blank?
      dir = "public/pdfs/#{@book.id}"
      @book.path = "#{dir}/#{file.original_filename}"
      self.copy_file_to(dir, file)
      self.create_images_from_pdf(dir, file)
    end
    if (!@book.save)
        raise GenericException, "The book could not be stored"
    end
    return @book
  end

  private

  def self.copy_file_to(dir, file)
    puts "copying file #{file}"
    FileUtils.mkdir_p dir
    f = File.new("#{dir}/#{file.original_filename}", "wb")
    f.write file.read
    f.close
    puts "end coping file..."
  end

  def self.create_images_from_pdf(dir, file)
    fileName = "#{dir}/#{file.original_filename}"
    puts "creating images from pdf #{fileName}"
    #Next line is the needed line to have the correct preview
    Docsplit.extract_images(fileName, :size => '500x', :density => '200', :format => 'jpg', :output => dir )
    #Next line is only used for dev-proposes.
    #Docsplit.extract_images(fileName, :size => '50x', :density => '200', :format => 'jpg', :output => dir )
  end
end
