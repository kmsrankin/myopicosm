class Narration < ApplicationRecord
  validates :body, presence: true
  belongs_to :user
  belongs_to :story
end
