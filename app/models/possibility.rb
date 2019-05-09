class Possibility < ApplicationRecord
  validates :body, presence: true
  belongs_to :user
  belongs_to :event
  has_many :votes
end
