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
    markers = Point.all.to_json

    render json: Point.all
  end
end
