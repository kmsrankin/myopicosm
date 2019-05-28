class StorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id, :members
  has_many :events
  def user_id
    if current_user
      current_user.id
    end
  end

  def members
    object.memberships.map do |membership|
      return membership.user
    end
  end
end
