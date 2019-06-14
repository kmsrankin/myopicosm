require 'spec_helper'

RSpec.describe Story do

  describe "New story is created" do
    it "can be made with a name and description and default to public access" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "This one is different", description: "uniqueness", user_id: user.id)
      expect(story.name).to eq("This one is different")
      expect(story.description).to eq("uniqueness")
    end

    it "can be made private" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "The man who ate his pet dog?!", description: "follow the saga of this strange person who ate his dog.", private: true, user_id: user.id)
      expect(story.private).to eq(true)
    end

    it "can have many events" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "A journey into the rose bush", description: "I decided to check out the inside of this dense rosebush and, man, there is some magical stuff going on in here!", user_id: user.id)
      event1 = Event.create!(story_id: story.id)
      event2 = Event.create!(story_id: story.id)
      expect(story.events).to eq([event1, event2])
    end

    it "can have many members" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "The sun that never set", description: "The sun came up this morning, but after that it fell forever and never set.", user_id: user.id)
      member1 = User.create!(email: "Kim@email.com", password: "7891011")
      member2 = User.create!(email: "Fin@email.com", password: "871643")
      membership1 = Membership.create!(user_id: member1.id, story_id: story.id)
      membership2 = Membership.create!(user_id: member2.id, story_id: story.id)
      expect(story.users).to eq([member1, member2])
      expect(story.memberships).to eq([membership1, membership2])
    end
  end
end
