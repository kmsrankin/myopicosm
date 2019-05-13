class StorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :user_id
  has_many :events
  def user_id
    if current_user
      current_user.id
    end
  end
end
