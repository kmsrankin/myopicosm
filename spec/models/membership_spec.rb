require 'spec_helper'

RSpec.describe Story do

  describe "New Membership is created" do
    it "should belong to a story and a user" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "The sun that never set", description: "The sun came up this morning, but after that it fell forever and never set.", user_id: user.id)
      member = User.create!(email: "Kim@email.com", password: "7891011")
      membership = Membership.create!(user_id: member.id, story_id: story.id)
      expect(membership.story_id).to eq(story.id)
      expect(membership.user_id).to eq(member.id)
    end

    it "should not be created without a story" do
      member = User.create!(email: "Kim@email.com", password: "7891011")
      membership = Membership.create(user_id: member.id)
      expect(membership.id).to eq(nil)
    end

    it "should not be created without a user" do
      user = User.create!(email: "Bob@email.com", password: "123456")
      story = Story.create!(name: "The sun that never set", description: "The sun came up this morning, but after that it fell forever and never set.", user_id: user.id)
      membership = Membership.create(story_id: story.id)
    end
  end
end
