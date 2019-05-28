class Api::V1::MembershipsController < ApplicationController
  def index
    render json: Membership.where(story_id: params[:story_id])
  end
end
