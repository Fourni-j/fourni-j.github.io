# About

Repository of [cafournier.com](https://cafournier.com)

## Develop locally

Use Ruby 4.0, matching GitHub Actions, and Bundler 4.0.20. The Gemfile requires Ruby 3.3 or newer. On Apple Silicon Macs with Homebrew Ruby, select it before running Bundler:

```sh
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
ruby --version
gem install bundler --version 4.0.20
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --host 127.0.0.1 --port 4000
```

Open [localhost:4000](http://127.0.0.1:4000). Local bundle configuration and installed gems are ignored by Git.

Build and check the production output before publishing:

```sh
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter
python3 tests/site-output.test.py _site
git diff --check
```

The output is `_site/`. GitHub Actions deploys it to GitHub Pages on pushes to `master`. Do not edit generated files.

## Project structure

- `_posts/` and the default layouts serve the personal blog.
- `_apps-pages/` contains app landing pages, guides, and legal pages; `apps.md` is the app directory.
- `_layouts/modern-app-*` and `_includes/app-head.html` share the modern app design and static metadata.
- FridgeBuddy has dedicated layouts, SEO includes, and English/French/German content under `_apps-pages/fridgebuddy/`. Shared translations and comparison data live in `_data/`.
- `_data/rides.yml` and `assets/rides/` supply the Leaflet bike-rides map.
- `teletravail/` is the standalone telework planner. Run `node tests/teletravail-core.test.js` when changing its logic.

## Dependency maintenance

Ruby dependencies are locked in `Gemfile.lock`; update them with `bundle update --all` and rerun the production checks. Keep macOS and Linux platforms in the lockfile for local development and GitHub Actions.

The browser dependencies are pinned separately: jQuery 4.0.0 is vendored under `assets/js/` and loaded once through `_includes/jquery.html`; Font Awesome 7.3.1 and Inter are shared through `_includes/app-fonts.html`; Leaflet remains on its current stable release, 1.9.4, in `rides.md`. When changing Font Awesome, update the integrity hash and check existing icon aliases. App Store lookups explicitly use JSONP; they supplement static app content.

## Generate new app page

Use the interactive makefile to generate a new app page with customizable sections:

```bash
make new-app
```

The script will prompt you for:
- **App Name**: The name of your app
- **App ID**: The App Store ID (used for fetching app icon and details)
- **Create app page?**: Whether to create a full modern app page or just a redirect
- **Create privacy policy?**: Whether to include a privacy policy page
- **Create terms?**: Whether to include a terms of service page  
- **Create changelog?**: Whether to include a changelog page

If you choose to create a full app page, you'll also be asked which sections to include:
- **Hero section**: App title, subtitle, and preview
- **Features section**: Key features list with icons
- **Testimonials section**: User reviews and feedback
- **Screenshots section**: App screenshots gallery
- **FAQ section**: Frequently asked questions

### Output Structure

The script creates a directory in `_apps-pages/[AppName]/` with the appropriate files based on your selections:

- `index.md`: Either a full modern app page or a redirect to its App Store listing, excluded from the sitemap
- `privacypolicy.md`: Privacy policy page (if selected)
- `terms.md`: Terms of service page (if selected)
- `changelog.md`: Changelog page (if selected)

Use an unused app directory: the generator can overwrite files in an existing one. Fill in `page_title`, `app_description`, and a local `app_icon`. Previews start disabled; set a real `preview_file` and `show_preview: true` to enable one. The generator creates the shared modern app layout; use FridgeBuddy's dedicated pages as a reference for localized guides and structured data.

### Section Formatting Examples

After generating your app page, you can customize each section in the `index.md` file:

#### Hero Section
```yaml
show_hero: true
hero_title: "Stop Wasting Food Organize Your Kitchen"
hero_subtitle: "Track expiration dates, manage pantry, fridge, and freezer items, and get alerts before food goes bad."
show_preview: true
```

#### Features Section
```yaml
show_features: true
features_title: "Key Features"
features:
  - title: Fast Input with Barcode & Date Scan
    description: Quickly add items by scanning barcodes or expiration dates. FridgeBuddy auto-fills product details and sorts your inventory.
    fontawesome_icon_name: camera

  - title: iCloud Sync Across All Devices
    description: Your inventory syncs instantly across iPhone, iPad via iCloud, so your lists are always up to date.
    fontawesome_icon_name: sync
```

#### Testimonials Section
```yaml
show_testimonials: true
testimonials_title: "Real Reviews from the App Store"
testimonials:
  - text: "I really like this app so far! I love being able to upload photos of my favorite foods."
    author: "Jupiter Tanks"
    role: "App Store Review"
    
  - text: "Really cool, simple app. Does what it's supposed to do."
    author: "NenaLinda82pr"
    role: "App Store Review"
```

#### Screenshots Section
```yaml
show_screenshots: true
screenshots_title: "See It In Action"
screenshots:
  - image: "/assets/app-pages/screenshots/app_main.png"
    alt: "App main dashboard"
    caption: "Main overview with key features"
    
  - image: "/assets/app-pages/screenshots/app_details.png"
    alt: "App details view"
    caption: "Detailed item management"
```

#### FAQ Section
```yaml
show_faq: true
faq_title: "Frequently Asked Questions"
faq:
  - question: "How does the app help reduce food waste?"
    answer: "The app sends you smart notifications before your food expires and tracks your consumption patterns with detailed analytics."
    
  - question: "Can I share my inventory with family members?"
    answer: "Yes! The app supports shared lists that sync across multiple users."
```

## Optimize video assets for app pages

```
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 output.mp4
```
