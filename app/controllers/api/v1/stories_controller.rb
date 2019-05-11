class Api::V1::StoriesController < ApplicationController
  def show
    render json: Story.find(params[:id])
  end

  def index
    render json: Story.all
  end

  def create
    story = Story.create(name: params[:name], description: params[:description], user_id: current_user.id)
    render json: story
    if story
      Event.create(story_id: story.id)
    end
  end
end
