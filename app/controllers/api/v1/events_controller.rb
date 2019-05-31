class Api::V1::EventsController < ApplicationController
  def show
    event = Event.find(params[:id])
    if !Story.find(event.story_id).private || Membership.find_by(user_id: current_user.id, story_id: event.story_id)
      render json: event
    end
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
    winning_possibility = potential_winners.sample

    if event.update(selected_possibility_id: winning_possibility.id)
      Event.create(story_id: story.id)
      render json: {story: story}
    end
  end
end
