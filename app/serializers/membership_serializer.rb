class MembershipSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :story_id, :email

  def email
    User.find(object.user_id).email
  end
end
