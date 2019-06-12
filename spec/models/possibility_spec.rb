require 'spec_helper'

RSpec.describe Possibility do

  describe "New Possibliity is created" do
    it " should belong to an event and user and have a body" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "This one is different", description: "uniqueness", user_id: user.id)
      event = Event.create!(story_id: story.id)
      possibility = Possibility.create!(user_id: user.id, event_id: event.id, body: "As the wind blows from many directions and in with many strengths, just so is this story evey changing in unexpected ways. No one would ever suspect that the next turn was an unexpected one.")
      expect(possibility.event_id).to eq(event.id)
      expect(possibility.user_id).to eq(user.id)
      expect(possibility.body).to eq("As the wind blows from many directions and in with many strengths, just so is this story evey changing in unexpected ways. No one would ever suspect that the next turn was an unexpected one.")
    end

    it "Cannot be made without belonging to a user" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "This one is different", description: "uniqueness", user_id: user.id)
      event = Event.create!(story_id: story.id)
      possibility = Possibility.create(event_id: event.id, body: "As the wind blows from many directions and in with many strengths, just so is this story evey changing in unexpected ways. No one would ever suspect that the next turn was an unexpected one.")
      expect(possibility.id).to eq(nil)
    end

    it "Cannot be made without belonging to an event" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      possibility = Possibility.create(user_id: user.id, body: "As the wind blows from many directions and in with many strengths, just so is this story evey changing in unexpected ways. No one would ever suspect that the next turn was an unexpected one.")
      expect(possibility.id).to eq(nil)
    end

    it "Cannot be made without a body" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "This one is different", description: "uniqueness", user_id: user.id)
      event = Event.create!(story_id: story.id)
      possibility = Possibility.create(user_id: user.id, event_id: event.id)
      expect(possibility.id).to eq(nil)
    end
  end
end
