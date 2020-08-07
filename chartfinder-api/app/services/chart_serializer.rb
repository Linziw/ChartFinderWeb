class ChartSerializer

  def initialize(chart_object)
    @chart=chart_object
  end

  def to_serialized_json
    options = {
      include:{
        songs:{
          only:[:name, :artist, :img_url]
        }
      }
    }

    @chart.to_json(options)
  end
end