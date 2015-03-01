class MapController < ApplicationController

  def index
    maps = Map.all.as_json
    render json: maps
  end

  def show
    map = Map.find_by_id(params[:id])

    markers = map.markers.all.as_json
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
end
