class AddVenueIdToMarker < ActiveRecord::Migration
  def change
    add_column :markers, :venue_id, :string
  end
end
