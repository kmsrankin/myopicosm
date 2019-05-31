class Api::V1::StoriesController < ApplicationController
  def show
    story = Story.find(params[:id])
    if !story.private || Membership.find_by(user_id: current_user.id, story_id: story.id)
      render json: Story.find(params[:id])
    end
  end

  def index
    allStories = Story.all
    accessibleStories = []

    allStories.each do |story|
      if !story.private
        accessibleStories << story
      elsif Membership.find_by(user_id: current_user.id, story_id: story.id)
        accessibleStories << story
      end
    end
    render json: accessibleStories
  end

  def create
    story = Story.create(name: params[:name], description: params[:description], user_id: current_user.id)
    render json: story
    if story
      Event.create(story_id: story.id)
    end
  end
end
