class RenameColumnsForNamingConventions < ActiveRecord::Migration
  def change
    change_table :points do |t|
      t.rename :userId, :user_id
      t.rename :mapId, :map_id
    end
    rename_column :maps,   :userId, :user_id
    rename_table  :points, :markers
  end
end
