class Story < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  has_many :events
end
