class EventsController < ApplicationController
  def show
    authenticate_user!
  end

  def create
  end
end
