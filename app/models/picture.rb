class Picture < ApplicationRecord
  mount_uploader :event_photo, EventPhotoUploader
  belongs_to :user
  belongs_to :event
end
