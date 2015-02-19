class CreatePoints < ActiveRecord::Migration
  def change
    create_table :points do |t|
      t.integer :userId
      t.integer :mapId
      t.string :venue
      t.string :title
      t.string :desc
      t.string :lat
      t.string :lng
      t.string :icon
      t.string :category

      t.timestamps
    end
  end
end
