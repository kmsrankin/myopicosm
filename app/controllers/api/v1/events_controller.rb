class Api::V1::EventsController < ApplicationController
  def show
    render json: Event.find(params[:id])
  end

  def create
    possibilities = Possibility.where(event_id: params[:event_id])
    winning_possibility = possibilities.first
    possibilities.each do |possibility|
      past_winner_votes = winning_possibility.votes.select {|vote| vote.upvoted}
      new_votes = possibility.votes.select {|vote| vote.upvoted}
      if new_votes.count > past_winner_votes.count
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
