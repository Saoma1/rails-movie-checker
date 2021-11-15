# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# User.destroy_all

User.create(username:'Soto', email: 'soto@soto.com', password: 111111)

Movie.create(user_id: 1,
  name: "Harry Potter and the Philosopher's Stone",
  genre: "Action,Thriller,Science Fiction",
  release_date: "2012-09-26 00:00:00",
  poster_url: '/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg')

#   Movie.create(user_id: 1,
#   name: "Godzilla vs. Kong",
#   genre: "Action, Adventure, Fantasy",
#   release_date: "2012-09-26 00:00:00",
#   poster_url: '/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg')
