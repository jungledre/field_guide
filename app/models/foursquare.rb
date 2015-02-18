class Foursquare
  def self.get_venues location, query
    params = {  near: location,
                query: query
                }
    response = self.query(params)
    response['response']['venues']
  end

  def self.query(params)
    params.merge!({
      client_id: ENV['FOURSQUARE_KEY'],
      client_secret: ENV['FOURSQUARE_SECRET'],
      v: '20150214',
      m: 'foursquare'
    })
    uri = URI.parse("https://api.foursquare.com/v2/venues/search")
    uri.query = URI.encode_www_form(params)
    puts uri.query
    res = Net::HTTP.get_response(uri).body
    results = JSON.parse(res)
  end
end
