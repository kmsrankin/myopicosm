class PossibilitiesController < ApplicationController
  def create
    @event = Event.find(params[:event_id])
    @user = current_user
    @possibility = Possibility.new(possibility_params)
    @possibility.event = @event
    @possibility.user = @user
    @story = @event.story
    binding.pry
    if @possibility.save
      flash[:notice] = "Possibility created successfully"
      redirect_to story_path(@story.id)
    else
      flash[:error] = @possibility.errors.full_messages.join(", ")
      redirect_to story_path(@story.id)
    end
  end

  private
  def possibility_params
    params.require(:possibility).permit(:body)
  end
end
