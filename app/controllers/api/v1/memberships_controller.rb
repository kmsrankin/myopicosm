class Api::V1::MembershipsController < ApplicationController
  def index
    render json: Membership.where(story_id: params[:story_id])
  end

  def create
    new_member = User.find_by(email: params[:newMember])
    membership = Membership.find_by(user_id: new_member.id, story_id: params[:storyID])
    if !membership
      newMembership = Membership.create(user_id: new_member.id, story_id: params[:storyID])
      render json: newMembership
    end
  end
end
