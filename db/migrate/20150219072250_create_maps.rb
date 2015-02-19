class CreateMaps < ActiveRecord::Migration
  def change
    create_table :maps do |t|
      t.integer :userId
      t.string :name
      t.string :desc

      t.timestamps
    end
  end
end
