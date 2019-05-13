class Event < ApplicationRecord
  belongs_to :story
  has_many :possibilities
  has_many :pictures
  accepts_nested_attributes_for :pictures
end
