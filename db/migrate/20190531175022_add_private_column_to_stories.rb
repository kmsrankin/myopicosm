class AddPrivateColumnToStories < ActiveRecord::Migration[5.2]
  def up
    add_column :stories, :private, :boolean, default: false
  end

  def down
    remove_column :stories, :private
  end
end
