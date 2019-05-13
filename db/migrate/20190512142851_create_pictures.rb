class CreatePictures < ActiveRecord::Migration[5.2]
  def change
    create_table :pictures do |t|
      t.string :event_photo, null: false
      t.belongs_to :event, null: false
      t.belongs_to :user, null: false
    end
  end
end
