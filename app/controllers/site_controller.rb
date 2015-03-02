class SiteController < ApplicationController

  def foursquare
    location = params[:location] || "seattle,wa"
    query = params[:query] || "donuts"

    results = Foursquare.get_venues location, query

    render :json => results
  end

  def foursquare_info
    venue_id = params || "40a55d80f964a52020f31ee3"

    results = Foursquare.get_venue_info venue_id

    render :json => results
  end
end
