class CreateAnnouncementsComments < ActiveRecord::Migration[6.0]
  def change
    create_table :announcements_comments do |t|
      t.string :comment
      t.integer :announcement_id
      t.integer :user_id

      t.timestamps
    end
  end
end
