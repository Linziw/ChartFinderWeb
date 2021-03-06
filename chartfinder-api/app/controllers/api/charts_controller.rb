require "open-uri"
include Helpers

class Api::ChartsController < ApplicationController
  before_action :set_chart, only: [:show]

  def show
    if @chart
      render json: ChartSerializer.new(@chart).to_serialized_json
    else
      date_to_url(@date)
      songs = scrape(@url, @date)
      chart = Chart.create(date: @date, country: "UK", start_date: @date_range[0], end_date: @date_range[1])
      chart.save
      make_songs(songs, chart)
      render json: ChartSerializer.new(chart).to_serialized_json
    end
  end

  private

  BASE_PATH = "https://www.officialcharts.com/charts/singles-chart/"

  def scrape(url, date)
    html = open(url)
    doc = Nokogiri::HTML(html)
    songs = doc.css("table.chart-positions div.track").first(40)
    @date_range = doc.at(".article-date").text.strip.split(/\s-\s\s/)
    year = date.split("-")[2]
    @song_array = []

    position = 1

    songs.each do |song|
      if position <= 40
        new_hash = {}
        new_hash[:name] = song.css(".title a").text.split.map(&:capitalize).join(" ")
        new_hash[:artist] = song.css(".artist a").text.split.map(&:capitalize).join(" ")
        new_hash[:label] = song.css(".label").text.split.map(&:capitalize).join(" ")
        new_hash[:img_url] = song.css(".cover img").attribute("src").value
        new_hash[:position] = position
        new_hash[:year] = year
        track = find_spotify_details(new_hash[:name])

        if track.first
          new_hash[:spotify_id] = track.first.id
          new_hash[:img_url] = track.first.album.images.first["url"]
        else
          new_hash[:spotify_id] = ""
        end
        position += 1
      end
      @song_array << new_hash
    end
    @song_array
  end

  

  def make_songs(songs, chart)
    songs.each do |song|
      @song = chart.songs.build(song)
      @song.save
    end
  end
end
