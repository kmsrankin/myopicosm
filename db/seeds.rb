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
Vote.destroy_all
User.destroy_all
Picture.destroy_all

keegan = User.create(email: "keeg@email.com", password: "123456")
iceking = User.create(email: "iceking@email.com", password: "123456")

big_bad_wolf = Story.create(name: "The Big Bad Wolf", description: "An improvisational reinterpretation of a classic story about a a wolf that huffs and puffs and blows your house down. Let us explore the fragile psyche of this hungry wolf. In the process, may we use this personified figure as a tool to reflect on ourselves and the world around us.", user_id: keegan.id)

fionas_story = Story.create(name: "Fionna and Cake!", description: "A new addition to the 'Adventure Time' fan-fiction series 'Fiona and Cake'. What horrible events will befall our heroes today? How might they overcome them? We will decide.", user_id: iceking.id)

wizards = Story.create(name: "Wizards of Launch Academy", description: "A group of students at Launch Academy share two commonalities. They are all learning web development and they are all wizards. Join us on our magical coding adventures as we dive headfirst into a strange and new profession.", user_id: keegan.id)
wolf_e1 = Event.create(story_id: big_bad_wolf.id)
wizards_e1 = Event.create(story_id: wizards.id)

fiona_possibilities = ["Fiona was getting ready to visit Prince Gumball at the candy Kingdom. As she flipped her Everything burrito through the air, she failed to catch it and it fell splat on the floor.", "Cake was upset! How could Fionna ruin such perfection?!", "BMO reminded everyone of the 5 second rule and everything was marginally okay. Cake apologized for being angry.", "As Cake and Fionna basked in their eternal friendship, BMO smashed the burrito into their face. 'It is still goooood!', they sang.", 'Just then, Ice Queen flew into the room, "I brought GUAAAAC!"', 'BMO, turned toward ice queen, still covered in burrito contents, "but we do not want you here Ice Queen, :)" they stated matter-of-factly', 'To herself, Ice Queen muttered, "oh... okay". But inside she was boiling with rage. She now felt an urge to suck all of the heat out of the room and freeze her friends to death. She floated, moping, out of the window.', 'Fionna could not help but to feel bad. "Do you think we should have let her stay?" she asked her comrades.', 'Cake was not happy at the thought. "No she will be fine..", she said', 'Fionna began to feel that apologizing to Ice Queen was probably the right thing after all. She confessed her guilt to Cake, "I think we should go find Ice Queen. Honestly it was not very cool of us to send her away. Also she was being nice, and even said she brought guacamole."', "Cake was into it. They didn't know where Ice Queen had gone though... I guess it's time for an adventure!", "They grabbed their weapons and darted out the door expecting to venture to the icey mountains"]

fiona_possibilities.each do |possibility|
  new_event = Event.create(story_id: fionas_story.id)
  new_possibility = Possibility.create(user_id: iceking.id, event_id: new_event.id, body: possibility)
  new_event.update(selected_possibility_id: new_possibility.id)
end

Event.create(story_id: fionas_story.id)
