# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
puts "Finding guest user"
user = User.where(:username => 'guest').first
if user==nil
  puts "Creating guest user"
  user = User.new 
  user.username = 'guest'
  user.password = ''
  user.lastname = 'guest'
  user.save
end