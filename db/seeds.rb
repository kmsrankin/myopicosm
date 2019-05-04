# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Story.destroy_all

Story.create(name: "The Big Bad Wolf", description: "An improvisational reinterpretation of a classic story about a a wolf that huffs and puffs and blows your house down. Let us explore the fragile psyche of this hungry wolf. In the process, may we use this personified figure as a tool to reflect on ourselves and the world around us.")
Story.create(name: "Fiona's Worst Day", description: "A piece of Adeventure Time fan-fiction about Ice King's fan-fiction series 'Fiona and Cake'. What horrible events will befall our heroes today? How might they overcome them? We will decide.")
Story.create(name: "Wizards of Launch Academy", description: "A group of students at Launch Academy share two commonalities. They are all learning web development and they are all wizards. Join us on our magical coding adventures as we dive headfirst into a strange and new profession.")
