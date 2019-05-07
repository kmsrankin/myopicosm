class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.belongs_to :story, null: false
      t.integer :selected_possibility_id, default: nil
    end
  end
end
