class MapController < ApplicationController

  def index
    puts "map:index"
    maps = Map.all.as_json
    # puts (maps)
    render json: maps
  end

  def show
    puts "map:show"
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

  def map_params
    puts "map:map_params"
    params.require(:map).permit(:name, :desc)
  end
end
