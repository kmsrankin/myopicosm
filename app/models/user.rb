class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :possibilities
  has_many :votes
  has_many :possibilities, through: :votes

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
