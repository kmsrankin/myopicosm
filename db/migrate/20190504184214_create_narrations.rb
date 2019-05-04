class CreateNarrations < ActiveRecord::Migration[5.2]
  def change
    create_table :narrations do |t|
      t.string :body, null: false

      t.belongs_to :story, null: false
      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
