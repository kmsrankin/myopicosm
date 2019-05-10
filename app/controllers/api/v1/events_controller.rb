class Api::V1::EventsController < ApplicationController
  def show
    render json: Event.find(params[:id])
  end

  def create
    possibilities = Possibility.where(event_id: params[:event_id])
    winning_possibility = possibilities.first
    possibilities.each do |possibility|
      if possibility.votes.count > winning_possibility.votes.count
        winning_possibility = possibility
      end
    end
    story = Story.find(params[:story_id])
    event = Event.where(story_id: story.id).last
    if event.update(selected_possibility_id: winning_possibility.id)
      Event.create(story_id: story.id)
      render json: {story: story}
    end
  end
end
