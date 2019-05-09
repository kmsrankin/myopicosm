class PossibilitySerializer < ActiveModel::Serializer
  attributes :id, :body, :current_user_vote_type

  def current_user_vote_type
    current_user_vote_type = false
    if current_user
      if Vote.find_by(user_id: current_user.id, possibility_id: object.id)
        current_user_vote_type = Vote.find_by(user_id: current_user.id, possibility_id: object.id).upvoted
      end
    end
    return current_user_vote_type
  end
end
