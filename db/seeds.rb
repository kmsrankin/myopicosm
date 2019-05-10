# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Story.destroy_all
Event.destroy_all
Possibility.destroy_all
User.destroy_all

keegan = User.create(email: "keeg@email.com", password: "123456")
iceking = User.create(email: "iceking@email.com", password: "123456")

big_bad_wolf = Story.create(name: "The Big Bad Wolf", description: "An improvisational reinterpretation of a classic story about a a wolf that huffs and puffs and blows your house down. Let us explore the fragile psyche of this hungry wolf. In the process, may we use this personified figure as a tool to reflect on ourselves and the world around us.", user_id: keegan.id)

fionas_story = Story.create(name: "Fiona's Worst Day", description: "A new addition to the 'Adeventure Time' fan-fiction series 'Fiona and Cake'. What horrible events will befall our heroes today? How might they overcome them? We will decide.", user_id: iceking.id)

wizards = Story.create(name: "Wizards of Launch Academy", description: "A group of students at Launch Academy share two commonalities. They are all learning web development and they are all wizards. Join us on our magical coding adventures as we dive headfirst into a strange and new profession.", user_id: keegan.id)

fiona_e1 = Event.create(story_id: fionas_story.id)

fiona_e1_p1 = Possibility.create(user_id: keegan.id, event_id: fiona_e1.id, body: "Fiona was getting ready to visit Prince Gumball at the candy Kingdom. As she flipped her Everything burrito through the air, she failed to catch it and it fell splat on the floor.")

fiona_e1.update(selected_possibility_id: fiona_e1_p1.id)

fiona_e2 = Event.create(story_id: fionas_story.id)
