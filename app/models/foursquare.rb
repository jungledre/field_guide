require "net/http"
require "uri"

class Foursquare
  def self.get_venues location, query
    params = {  near: location,
                query: query
                }
    response = self.query(params)
    response['response']['venues']
  end

  def self.query params
    params.merge!({
      client_id: ENV['FOURSQUARE_KEY'],
      client_secret: ENV['FOURSQUARE_SECRET'],
      v: '20150214',
      m: 'foursquare'
    })
    uri = URI.parse("https://api.foursquare.com/v2/venues/search")
    uri.query = URI.encode_www_form(params)
    res = Net::HTTP.get_response(uri).body
    results = JSON.parse(res)
  end

  def self.get_venue_info venue_id
    response = self.query_venue(venue_id)
    response['response']['venue']
  end

  def self.query_venue venue_id
    params = {
      client_id: ENV['FOURSQUARE_KEY'],
      client_secret: ENV['FOURSQUARE_SECRET'],
      v: '20150214',
      m: 'foursquare'
    }
    uri = URI.parse("https://api.foursquare.com/v2/venues/#{venue_id.first.second}")
    uri.query = URI.encode_www_form(params)
    res = Net::HTTP.get_response(uri).body
    results = JSON.parse(res)
  end
end
