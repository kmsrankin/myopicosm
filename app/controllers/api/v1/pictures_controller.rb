class Api::V1::PicturesController < ApplicationController
  def create
    picture = Picture.create(event_photo: params[:event_photo], user_id: current_user.id, event_id: params[:event_id])
    render json: picture
  end
end
