class CreateStories < ActiveRecord::Migration[5.2]
  def change
    create_table :stories do |t|
      t.string :name, null: false
      t.string :description, null: false

      t.belongs_to :user

      t.timestamps null: false
    end
  end
end
