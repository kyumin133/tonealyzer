@blurbs.each do |blurb|
  json.set! blurb.id do
    json.partial! "api/blurbs/blurb", blurb: blurb
  end
end
