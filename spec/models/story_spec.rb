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
  end
end
