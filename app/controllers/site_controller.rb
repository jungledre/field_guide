class SiteController < ApplicationController

  def index
    markers = Marker.all.to_json
  end

  def foursquare
    location = params[:location] || "seattle,wa"
    query = params[:query] || "donuts"

    results = Foursquare.get_venues location, query

    render :json => results
  end
end
