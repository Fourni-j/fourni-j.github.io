# Builds the FridgeBuddy food storage guides (one page per food and language,
# plus a hub per language) from _data/fridgebuddy_storage.yml.
module FridgeBuddy
  class StorageGuides < Jekyll::Generator
    safe true

    LANGS = { "en" => "en-US", "fr" => "fr", "de" => "de" }.freeze
    HOMES = { "en" => "/fridgebuddy/", "fr" => "/fridgebuddy/fr/", "de" => "/fridgebuddy/de/" }.freeze

    def generate(site)
      @data = site.data["fridgebuddy_storage"] or return
      foods = @data.fetch("foods")

      LANGS.each_key do |lang|
        t = @data.fetch("text").fetch(lang)
        foods.each { |food| site.pages << food_page(site, food, lang, t, foods) }
        site.pages << hub_page(site, lang, t, foods)
      end
    end

    private

    def food_page(site, food, lang, t, foods)
      rows = food.fetch("rows").map { |row| format_row(row, lang, t) }
      primary = rows.first
      vars = food_vars(food, lang, t, primary)
      intro_freezer = primary["freezer_keyword"] ? fill(t["freezer_sentence_none"], vars) : fill(t["freezer_sentence"], vars)
      meta_key = primary["freezer_keyword"] ? "meta_nofreeze" : "meta"
      freeze_answer = primary["freezer_keyword"] ? t["faq_freeze_no"] : t["faq_freeze_yes"]
      siblings = foods.select { |other| other["category"] == food["category"] && other != food }.first(4)

      build(site, food_url(food, lang), lang, food.fetch("id"),
        "title" => fill(t["title"], vars),
        "page_title" => page_title(t, vars),
        "meta_description" => fill(t[meta_key], vars),
        "intro" => fill(t["intro"], vars.merge("freezer_sentence" => intro_freezer)),
        "storage_rows" => rows,
        "storage_category" => food["category"],
        "breadcrumbs" => crumbs(lang, t) + [{ "name" => food["label"][lang], "url" => food_url(food, lang) }],
        "faq" => [
          { "question" => fill(t["faq_fridge_q"], vars), "answer" => fill(t["faq_fridge_a"], vars) },
          { "question" => fill(t["faq_freeze_q"], vars), "answer" => fill(freeze_answer, vars) }
        ],
        "related_links" => siblings.map { |other|
          { "title" => other["label"][lang], "description" => t["related_food_desc"], "url" => food_url(other, lang) }
        } + [
          { "title" => t["related_hub"], "description" => t["related_hub_desc"], "url" => @data["hubs"][lang] },
          { "title" => t["related_tracker"], "description" => t["related_tracker_desc"], "url" => t["tracker_url"] }
        ],
        "hreflang" => LANGS.keys.to_h { |code| [code, food_url(food, code)] })
    end

    def hub_page(site, lang, t, foods)
      groups = @data.fetch("categories").map do |category|
        {
          "name" => t["categories"][category]["name"],
          "foods" => foods.select { |food| food["category"] == category }.map { |food|
            row = format_row(food["rows"].first, lang, t)
            { "label" => food["label"][lang], "url" => food_url(food, lang), "fridge" => row["fridge"], "freezer" => row["freezer"] }
          }
        }
      end

      build(site, @data["hubs"][lang], lang, "hub",
        "title" => t["hub_title"],
        "page_title" => t["hub_page_title"],
        "meta_description" => t["hub_meta"],
        "intro" => t["hub_intro"],
        "storage_groups" => groups,
        "breadcrumbs" => crumbs(lang, t),
        "related_links" => [
          { "title" => t["related_tracker"], "description" => t["related_tracker_desc"], "url" => t["tracker_url"] }
        ],
        "hreflang" => @data["hubs"].dup)
    end

    def build(site, url, lang, id, data)
      page = Jekyll::PageWithoutAFile.new(site, site.source, url.delete_prefix("/"), "index.html")
      page.content = "{% include fridgebuddy-storage-guide.html %}"
      t = @data["text"][lang]
      page.data.merge!(
        "layout" => "fridgebuddy-page",
        "lang" => LANGS[lang],
        "canonical_path" => url,
        "schema_type" => "web_page",
        "storage_guide" => id,
        "ios_app_id" => 1500190823,
        "app_name" => "FridgeBuddy",
        "social_image" => "/assets/app-pages/fridgebuddy-icon.png",
        "date_published" => @data["date_published"],
        "date_modified" => @data["date_modified"],
        "last_modified_at" => Date.iso8601(@data["date_modified"]),
        "date_modified_display" => display_date(@data["date_modified"], lang),
        "storage_track" => fill(t["track_body"], "tracker_url" => t["tracker_url"]),
        "storage_source" => fill(t["source"], "url" => @data["source"]["url"], "date" => t["source_date"])
      )
      page.data.merge!(data)
      page
    end

    # Drop the "fridge and freezer" suffix when it would push the title past what search results show.
    def page_title(t, vars)
      full = fill(t["page_title"], vars)
      full.length > 62 ? fill(t["page_title_short"], vars) : full
    end

    def crumbs(lang, t)
      [{ "name" => "FridgeBuddy", "url" => HOMES[lang] }, { "name" => t["hub_crumb"], "url" => @data["hubs"][lang] }]
    end

    def food_url(food, lang)
      "#{@data['hubs'][lang]}#{food['slug'][lang]}/"
    end

    def food_vars(food, lang, t, primary)
      name = food["name"][lang]
      number = food.dig("plural", lang) ? "plural" : "singular"
      {
        "name" => name,
        "name_cap" => name[0].upcase + name[1..],
        "name_acc" => food.dig("name_acc", lang) || name,
        "label" => food["label"][lang],
        "does" => t["does"][number],
        "keeps" => t["keeps"][number],
        "fridge" => primary["fridge"],
        "fridge_cap" => primary["fridge"][0].upcase + primary["fridge"][1..],
        "freezer" => primary["freezer"],
        "freezer_short" => primary["freezer_short"]
      }
    end

    def format_row(row, lang, t)
      fridge = duration(row.fetch("fridge"), t)
      fridge = "#{fridge} #{t['or_use_by']}" if row["or_use_by"]
      keyword = t["durations"].key?(row.fetch("freezer"))
      {
        "variant" => row.dig("variant", lang),
        "fridge" => fridge,
        "freezer" => duration(row["freezer"], t),
        "freezer_short" => keyword ? t["durations_short"][row["freezer"]] : duration(row["freezer"], t),
        "freezer_keyword" => keyword
      }
    end

    # "1-2 day" -> "1 to 2 days"; "9 month" -> "9 months"; keywords use the translated text.
    def duration(value, t)
      return t["durations"][value] if t["durations"].key?(value)

      match = value.match(/\A(\d+)(?:-(\d+))? (day|week|month|year)\z/) or raise ArgumentError, "Bad storage duration: #{value}"
      min, max, unit = match.captures
      singular, plural = t["units"].fetch(unit)
      noun = (max || min).to_i == 1 ? singular : plural
      max ? "#{fill(t['range'], 'min' => min, 'max' => max)} #{noun}" : "#{min} #{noun}"
    end

    def fill(template, vars)
      template.gsub(/%\{(\w+)\}/) { vars.fetch(Regexp.last_match(1)) }
    end

    MONTHS = {
      "fr" => %w[janvier février mars avril mai juin juillet août septembre octobre novembre décembre],
      "de" => %w[Januar Februar März April Mai Juni Juli August September Oktober November Dezember]
    }.freeze

    def display_date(iso, lang)
      date = Date.iso8601(iso)
      case lang
      when "fr" then "#{date.day} #{MONTHS['fr'][date.month - 1]} #{date.year}"
      when "de" then "#{date.day}. #{MONTHS['de'][date.month - 1]} #{date.year}"
      else date.strftime("%B %-d, %Y")
      end
    end
  end
end
