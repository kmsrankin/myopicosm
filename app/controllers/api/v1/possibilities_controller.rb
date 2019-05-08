class Api::V1::PossibilitiesController < ApplicationController
  def create
    possibility = Possibility.create(body: params[:body], user_id: current_user.id, event_id: params[:event_id])
    render json: {possibility: possibility}
  end
end
