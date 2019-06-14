require 'spec_helper'

RSpec.describe Possibility do

  describe "New Vote is created" do
    it "should belong to a possibility and user and default to truthy upvote" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "This one is different", description: "uniqueness", user_id: user.id)
      event = Event.create!(story_id: story.id)
      possibility = Possibility.create!(user_id: user.id, event_id: event.id, body: "As the wind blows from many directions and in with many strengths, just so is this story evey changing in unexpected ways. No one would ever suspect that the next turn was an unexpected one.")
      vote = Vote.create!(possibility_id: possibility.id, user_id: user.id)
      expect(vote.possibility_id).to eq(possibility.id)
      expect(vote.user_id).to eq(user.id)
      expect(vote.upvoted).to eq(true)
    end

    it "cannot be made without belonging to a possibility" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      vote = Vote.create(user_id: user.id)
      expect(vote.id).to eq(nil)
    end

    it "cannot be made without belonging to a user" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "This one is different", description: "uniqueness", user_id: user.id)
      event = Event.create!(story_id: story.id)
      possibility = Possibility.create!(user_id: user.id, event_id: event.id, body: "As the wind blows from many directions and in with many strengths, just so is this story evey changing in unexpected ways. No one would ever suspect that the next turn was an unexpected one.")
      vote = Vote.create(possibility_id: possibility.id)
      expect(vote.id).to eq(nil)
    end
  end

  describe "vote is updated" do
    it "should be able to reverse the boolean of the upvoted attribute" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "This one is different", description: "uniqueness", user_id: user.id)
      event = Event.create!(story_id: story.id)
      possibility = Possibility.create!(user_id: user.id, event_id: event.id, body: "As the wind blows from many directions and in with many strengths, just so is this story evey changing in unexpected ways. No one would ever suspect that the next turn was an unexpected one.")
      vote = Vote.create!(possibility_id: possibility.id, user_id: user.id)
      expect(vote.upvoted).to eq(true)
      vote.update!(upvoted: !vote.upvoted)
      expect(vote.upvoted).to eq(false)
    end
  end
end
