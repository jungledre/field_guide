class MarkerController < ApplicationController
  def create
    params[:point].each do |p|
      object = { venue: p["venue"],
                 lat: p["lat"],
                 lng: p["lng"],
                 icon: p["icon"]
               }
      Marker.find_or_create_by(object)
    end

    render json: Marker.all
  end

  def get_markers
    markers = Marker.all.as_json
    markers = markers.map {|x| x.merge({
      :icon => { iconUrl:      x["icon"],
                 iconSize:     [32, 32],
                 shadowSize:   [50, 64],
                 iconAnchor:   [16, 32],
                 shadowAnchor: [4, 62],
                 popupAnchor:  [-3, -76]},
      :label => { message: x["venue"],
                  options: {
                    noHide: true
                  }
                }
    }) }
    render json: markers
  end
end
