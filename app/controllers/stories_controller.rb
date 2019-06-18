class StoriesController < ApplicationController
  def index
    authenticate_user!
  end

  def show
    authenticate_user!
  end
end
