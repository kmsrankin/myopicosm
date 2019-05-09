class Api::V1::VotesController < ApplicationController
  def create
    vote = Vote.find_by(user_id: current_user, possibility_id: params[:possibility_id])
    if !vote
      Vote.create(user_id: current_user.id, possibility_id: params[:possibility_id])
    else
      vote.update(upvoted: !vote.upvoted)
    end
  end
end
