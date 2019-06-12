require 'spec_helper'

RSpec.describe Event do

  describe "New Event is created" do
    it "belongs to a story and does not have a selected possibility by default" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "This one is different", description: "uniqueness", user_id: user.id)
      event = Event.create!(story_id: story.id)
      expect(event.story_id).to eq(story.id)
      expect(event.selected_possibility_id).to eq(nil)
    end

    it "Cannot be made without belonging to a story" do
      event = Event.create()
      expect(event.id).to eq(nil)
    end
  end

  describe "A possibility is selected" do
    it "updates the selected possibility id of the event from nil to an id" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "This one is different", description: "uniqueness", user_id: user.id)
      event = Event.create!(story_id: story.id)
      possibility = Possibility.create!(event_id: event.id, user_id: user.id, body: "Okay now it's getting weird.")
      event.update!(selected_possibility_id: possibility.id)
      expect(event.selected_possibility_id).to eq(possibility.id)
    end
  end
end
