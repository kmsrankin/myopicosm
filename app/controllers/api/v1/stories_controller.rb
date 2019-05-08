class Api::V1::StoriesController < ApplicationController
  def show
    render json: Story.find(params[:id])
  end

  def index
    render json: Story.all
  end
end
