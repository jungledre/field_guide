class MarkerController < ApplicationController
  def create
    params[:point].each do |p|
      object = { venue: p["venue"],
                 lat: p["lat"],
                 lng: p["lng"],
                 icon: p["icon"]
               }
      Point.find_or_create_by(object)
    end

    render json: Point.all
  end

  def get_markers
    markers = Point.all.as_json
    markers = markers.map {|x| x.merge({:icon => {iconUrl: x["icon"]},
                                        :label => {message: x["venue"]}}) }
    render json: markers
  end
end
