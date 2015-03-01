class MarkerController < ApplicationController

  def create
    @map = Map.new
    if @map.save
      params[:marker].each do |p|
        object = {  venue: p['venue'],
                    venue_id: p['venue_id'],
                    map_id: p['map_id'],
                    category: p['category'],
                    lat: p['lat'],
                    lng: p['lng'],
                    icon: p['icon']
                  }
        @map.markers << Marker.find_or_create_by(object)
      end
    end
    render json: Marker.all
  end

  def get_markers
    markers = Marker.all.as_json
    markers = markers.map {|x| x.merge({
      :icon => {  iconUrl:      x['icon'],
                  iconSize:     [32, 32],
                  shadowSize:   [50, 64],
                  iconAnchor:   [16, 32],
                  shadowAnchor: [4, 62],
                  popupAnchor:  [-3, -76]
                },
      :label => { message: x['venue'],
                  options: {
                    noHide: false
                  }
                }
    })}
    render json: markers
  end

  # def map_params
  #   params.require(:map).permit(:name)
  # end
end
