class CreateAnnouncements < ActiveRecord::Migration[6.0]
  def change
    create_table :announcements do |t|
      t.string :title
      t.text :content
      t.float :score
      t.timestamps
    end
  end
end
