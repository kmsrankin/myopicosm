class StorySerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :events
  has_many :events
end
