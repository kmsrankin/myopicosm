class EventSerializer < ActiveModel::Serializer
  attributes :id, :story_id, :selected_possibility, :user_id, :creator
  has_many :possibilities

  def selected_possibility
    if object.selected_possibility_id
      Possibility.find(object.selected_possibility_id)
    end
  end

  def user_id
    if current_user
      current_user.id
    end
  end

  def creator
    if current_user
      object.story.user_id == current_user.id
    else
      false
    end
  end
end
