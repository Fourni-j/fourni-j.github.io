# Refresh the release dates used to order the homepage's secondary app catalog.
# Run before building: ruby scripts/update-app-dates.rb
require "json"
require "open-uri"
require "time"
require "yaml"

catalog_path = File.expand_path("../_data/home_apps.yml", __dir__)
catalog = YAML.safe_load_file(catalog_path)
apps = catalog.fetch("more")
ids = apps.map do |app|
  app.fetch("url").match(%r{\Ahttps://apps\.apple\.com/app/id(\d+)\z})&.captures&.first ||
    abort("Invalid App Store URL for #{app.fetch('name')}")
end

begin
  endpoint = "https://itunes.apple.com/lookup?id=#{ids.join(',')}&country=us"
  response = URI.open(endpoint, open_timeout: 10, read_timeout: 20, &:read)
  results = JSON.parse(response).fetch("results").to_h { |app| [app.fetch("trackId").to_s, app] }
  # Validate the entire response before touching the saved catalog.
  dates = ids.to_h do |id|
    date = results.fetch(id).fetch("currentVersionReleaseDate")
    [id, Time.iso8601(date).utc.iso8601]
  end
rescue StandardError => error
  warn "App Store dates could not be refreshed (#{error.class}); keeping the saved dates."
  exit 0
end

changed = false
apps.zip(ids).each do |app, id|
  changed ||= app["updated_at"] != dates.fetch(id)
  app["updated_at"] = dates.fetch(id)
end

if changed
  header = "# Featured app order is curated; More to explore is sorted by updated_at.\n" \
           "# Release dates come from Apple's US lookup API; artwork is saved locally.\n"
  File.write(catalog_path, header + YAML.dump(catalog))
end
puts "Verified App Store release dates for #{apps.length} apps#{changed ? '; saved updates' : '; no changes'}."
