class PossibilitiesController < ApplicationController
  def create
    @event = Event.find(params[:event_id])
    @user = current_user
    @possibility = Possibility.new(possibility_params)
    @possibility.event = @event
    @possibility.user = @user
    @story = @event.story
    if @possibility.save
      flash[:notice] = "Possibility created successfully"
      redirect_to story_event_path(@story.id, @event.id)
    else
      flash[:error] = @possibility.errors.full_messages.join(", ")
      redirect_to story_event_path(@story.id, @event.id)
    end
  end

  private
  def possibility_params
    params.require(:possibility).permit(:body)
  end
end
