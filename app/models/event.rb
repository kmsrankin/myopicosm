class Event < ApplicationRecord
  belongs_to :story
  has_many :possibilities
end
