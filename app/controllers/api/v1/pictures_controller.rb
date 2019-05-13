class Api::V1::PicturesController < ApplicationController
  def create
    binding.pry

    Picture.create(event_photo: params[:event_photo], user_id: current_user.id, event_id: params[:event_id])
    # story = Story.create(name: params[:name], description: params[:description], user_id: current_user.id)
    # render json: story
    # if story
    #   Event.create(story_id: story.id)
    # end
  end
end
