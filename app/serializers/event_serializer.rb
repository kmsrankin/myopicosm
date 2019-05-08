class EventSerializer < ActiveModel::Serializer
  attributes :id, :selected_possibility
  has_many :possibilities

  def selected_possibility
    if object.selected_possibility_id
      Possibility.find(object.selected_possibility_id)
    end
  end
end
