class Story < ApplicationRecord
  validates :name, presence: true
  validates :description, presence: true
  has_many :events
  has_many :memberships
  has_many :users, through: :memberships
  belongs_to :user
end
