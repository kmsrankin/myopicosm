class Api::V1::EventsController < ApplicationController
  def show
    render json: Event.find(params[:id])
  end

  def create
    event = Event.find(params[:event_id])
    story = Story.find(params[:story_id])
    possibilities = Possibility.where(event_id: event.id)
    winning_possibility = possibilities.first
    potential_winners = []
    possibilities.each do |possibility|
      past_winner_votes = winning_possibility.votes.select {|vote| vote.upvoted}
      new_votes = possibility.votes.select {|vote| vote.upvoted}
      if new_votes.count > past_winner_votes.count
        winning_possibility = possibility
        potential_winners = [winning_possibility]
      elsif new_votes.count == past_winner_votes.count
        potential_winners << possibility
      end
    end
    if potential_winners.length > 1
      winning_possibility = potential_winners.sample
    end
    if event.update(selected_possibility_id: winning_possibility.id)
      Event.create(story_id: story.id)
      render json: {story: story}
    end
  end
end
