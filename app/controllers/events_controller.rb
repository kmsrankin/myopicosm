class EventsController < ApplicationController
  def show
    @event = Event.find(params[:id])
    @story = @event.story
    @possibilities = Possibility.where(event_id: @event.id)
    @possibility = Possibility.new
  end

  def create
    @story = Story.find(params[:story_id])
    @event = Event.new(event_params)
    @event.story = @story
    if @event.save
      flash[:notice] = "Event created successfully"
      redirect_to story_path(@story.id)
    else
      flash[:error] = @event.errors.full_messages.join(", ")
      redirect_to story_path(@story.id)
    end
  end

  private
  def event_params
    params.require(:event).permit(:body)
  end
end
