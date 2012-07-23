class User
  include MongoMapper::Document

  key :username, String
  key :password, String
  key :lastname, String
  many :books
end
