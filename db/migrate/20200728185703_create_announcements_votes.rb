class CreateAnnouncementsVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :announcements_votes do |t|
      t.integer :vote
      t.integer :announcement_id
      t.integer :user_id

      t.timestamps
    end
  end
end
