class EventSerializer < ActiveModel::Serializer
  attributes :id, :selected_possibility, :user_id
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
end
