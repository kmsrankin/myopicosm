class Api::V1::ThesaurusController < ApplicationController
  def search
    key= ENV["BIG_HUGE_LABS_KEY"]
    word = params["word"]
    url = "http://words.bighugelabs.com/api/2/#{key}/#{word}/json"

    encoded_url = URI.encode(url)
    uri = URI.parse(encoded_url)
    response = Net::HTTP.get_response(uri)

    data = JSON.parse(response.body)
    render json: data
  end
end
