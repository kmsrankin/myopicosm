class Story < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  has_many :events
  has_many :memberships
  belongs_to :user
  has_many :users, through: :memberships
end
