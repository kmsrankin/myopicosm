class StoriesController < ApplicationController
  def index
    @stories = Story.all
  end

  def show
    @story = Story.find(params[:id])
    @events = Event.where(story_id: @story.id)
    # @selected_possibilities = @events.map do |event|
    #   if event.selected_possibility_id
    #     Possibility.find(event.selected_possibility_id)
    #   else
    #     {possibility: {body: "Decide what's next!"}}
    #   end
    # end
  end
end
