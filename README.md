# About

Repository of [cafournier.com](https://cafournier.com)

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

- `index.md`: Either a full modern app page or a redirect to the homepage
- `privacypolicy.md`: Privacy policy page (if selected)
- `terms.md`: Terms of service page (if selected)
- `changelog.md`: Changelog page (if selected)

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