class EventSerializer < ActiveModel::Serializer
  attributes :id, :story_id, :selected_possibility, :user_id, :creator, :select_pictures
  has_many :possibilities
  has_many :pictures

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

  def select_pictures
    object.pictures
  end

  def creator
    if current_user
      object.story.user_id == current_user.id
    else
      false
    end
  end
end
