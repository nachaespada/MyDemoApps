class Book
  include MongoMapper::Document

  key :title, String
  key :description, String
  key :labels, String
  key :author, String
  key :path, String
  belongs_to :user

  validates_presence_of :title
  validates_presence_of :labels
  validates_presence_of :author
  validates_presence_of :description

  def self.search(info)
	  Book.where(:$or => [{:title => "#{info}"}, {:author => "#{info}"}]).all
	end

end
