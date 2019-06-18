class HomesController < ApplicationController
  def home
      authenticate_user!
      redirect_to stories_path
  end
end
