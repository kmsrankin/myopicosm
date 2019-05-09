class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.belongs_to :possibility, null: false
      t.belongs_to :user, null: false

      t.boolean :upvoted, default: true

      t.timestamps null: false
    end
    add_index :votes, [:user_id, :possibility_id], unique: true
  end
end
