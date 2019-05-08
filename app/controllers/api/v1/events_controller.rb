class Api::V1::EventsController < ApplicationController
  def show
    render json: Event.find(params[:id])
  end
end
