---
layout: fridgebuddy-page
lang: en-US
title: Privacy Policy
page_title: "FridgeBuddy Privacy Policy"
meta_description: "How FridgeBuddy handles your data: inventory stored in your private iCloud, no account required, no ads, no tracking, and no sale of personal data."
schema_type: web_page
ios_app_id: 1500190823
include_in_header: false
app_name: FridgeBuddy
app_icon: /assets/app-pages/fridgebuddy-icon.png
hide_hero_cta: true
date_modified: 2026-11-05
hreflang:
  en: /fridgebuddy/privacypolicy
  fr: /fridgebuddy/fr/confidentialite/
  de: /fridgebuddy/de/datenschutz/
breadcrumbs:
  - name: FridgeBuddy
    url: /fridgebuddy/
  - name: Privacy Policy
    url: /fridgebuddy/privacypolicy
---

**Last updated:** November 5, 2026

This privacy policy describes how the FridgeBuddy app ("FridgeBuddy", "the app") handles your information. FridgeBuddy is developed by Charles-Adrien Fournier, an independent developer based in Paris, France, who is responsible for the data processing described here. You can reach me at [feedback@cafournier.com](mailto:feedback@cafournier.com).

The short version: your food inventory belongs to you. It is stored on your device and in your private iCloud space, where I cannot see it. FridgeBuddy has no user accounts, shows no ads, does not sell personal data and does not track you across apps. To work, it relies on a few services, each listed below with the data it receives.

## Data you add to the app

The items you track (products, expiration dates, storage locations, photos, notes, shopping lists, and consumption or waste history) are stored:

- **On your device**, so the app works offline.
- **In your private iCloud database (Apple CloudKit)**, so your inventory syncs across your Apple devices and stays available if you change devices. This data is tied to your Apple Account and is not accessible to the developer.

If you share your household, its storage locations, items and shopping lists are shared with the people you invite, through iCloud sharing. You can stop sharing at any time from the app or from iCloud settings.

## Product lookups

When you scan a barcode, the app sends it to [Open Food Facts](https://world.openfoodfacts.org), an online product database, to retrieve the product's name, image and nutrition information (including Nutri-Score and Green-Score when available). Product images are then loaded from Open Food Facts' servers. Only the barcode is sent, and FridgeBuddy does not tie it to your identity. Products not found online can be saved on your device and reused locally.

## Product recalls

When you add an item or open its details, the app sends its barcode to [RappelConso](https://rappel.conso.gouv.fr/), the French government's product recall database, to warn you if the product has been recalled. Only the barcode is sent. You can turn this off in Settings > Inventory > Check for Product Recalls.

## Receipt and shelf photos

When you add items from a receipt or a shelf photo, the photo is analyzed to find the products in it. Depending on your device and iOS version, this happens on your device or with Apple's [Private Cloud Compute](https://security.apple.com/blog/private-cloud-compute/), which Apple designed so that your data is used only to answer the request and is neither stored nor made accessible to Apple. The photo is never sent to me or to any other service.

The other Apple Intelligence features in FridgeBuddy, such as meal ideas, Insights tips and the clean-up of product names, run on your device.

## Purchases

FridgeBuddy is free to download and offers optional purchases and subscriptions, paid through Apple's App Store. Payment details never reach me: Apple processes all transactions.

To know which purchases you are entitled to, the app uses RevenueCat. RevenueCat receives your purchase history (products, dates, renewals, cancellations and refunds), a random identifier the app creates on first launch, and technical details such as the app version, iOS version and App Store country. If you installed FridgeBuddy from an Apple Ads ad, RevenueCat also receives from Apple the campaign that led to the install, so I can tell which campaigns work. This uses no advertising identifier.

## Usage analytics

To understand which features are used and to fix problems, the app sends usage events to Mixpanel, for example that an item was added by scanning, that a scan failed or that the subscription screen was shown. Events carry the same random identifier, technical details such as the app version, iOS version and device model, and counts or error codes. They contain no product names, barcodes, notes or photos. RevenueCat also sends purchase events (such as a trial start, a renewal or a cancellation) to Mixpanel under the same identifier.

This data is stored in the European Union (Mixpanel EU Data Residency). Up to FridgeBuddy 2.35, Mixpanel used your IP address to estimate your approximate location (city, region and country); since FridgeBuddy 2.36, it no longer does. Because the same identifier appears in support emails (see below), this data is linked to you once you contact me.

## Feature requests

Settings > Suggest a Feature opens a public board run by WishKit. The requests, comments and votes you post are sent to WishKit with a random WishKit identifier, and other FridgeBuddy users can see them. Up to FridgeBuddy 2.35, the board offered an optional email field; since FridgeBuddy 2.36, it no longer asks for your email address. Please do not include personal information in what you post.

## Support emails

When you write from Settings > Contact Support, your email app sends the message from your own address. The app prefills a footer with your app and iOS versions, device model, language, subscription, household and iCloud status, and your Support ID, which is the random identifier described above. It helps me look into your issue, and you can edit or remove it before sending.

## Notifications

Expiration reminders are scheduled locally on your device. They do not require sending your data to a server.

## Data export and deletion

You can export your inventory to a CSV file at any time from the app; the export is created on your device and shared only where you choose to send it. Deleting an item, a storage location, or the app's iCloud data removes it from your private database. You can also disable iCloud sync for FridgeBuddy in iOS Settings.

## Who receives data

- **Apple** (iCloud, App Store, Private Cloud Compute, Apple Ads attribution), under [Apple's privacy policy](https://www.apple.com/legal/privacy/).
- **Open Food Facts** (France): barcodes and product image requests.
- **RappelConso**, run by the French government (France): barcodes for recall checks.
- **RevenueCat, Inc.** (United States): purchase history, random identifier and technical details, stored in the United States. These transfers rely on the European Commission's Standard Contractual Clauses.
- **Mixpanel**: usage events, stored in the European Union.
- **WishKit LLC** (United States): feature requests, comments and votes, stored in the United States.

## Legal bases and retention

Under the EU General Data Protection Regulation (GDPR):

- **Features you use** (sync, product lookups, recall checks, photo analysis, purchases) rely on providing the service you ask for (Article 6(1)(b)).
- **Usage analytics and Apple Ads attribution** rely on my legitimate interest in improving the app and knowing which campaigns work (Article 6(1)(f)). You can object at any time.
- **Feature requests and support emails** rely on my legitimate interest in answering what you choose to send me (Article 6(1)(f)).

Purchase records are kept as long as needed to provide your purchases and meet accounting obligations. Usage events are kept as long as they help understand how the app is used. Support emails are kept as long as needed to handle your request and its follow-ups. Feature requests stay on the board until you or I remove them. Any of this data is deleted on request, within the limits of legal obligations.

## Your rights

You can ask to access, correct or delete your data, to restrict or object to its processing, and to receive it in a portable format. FridgeBuddy has no accounts, so please include your Support ID (it appears in any email sent from Settings > Contact Support): it lets me find the purchase and analytics records tied to it. Write to [feedback@cafournier.com](mailto:feedback@cafournier.com); I reply within one month. The data in your iCloud stays under your control and can be deleted from the app or from iOS Settings.

You can also lodge a complaint with the French data protection authority, the [CNIL](https://www.cnil.fr), or with the authority of your country.

## What FridgeBuddy does not do

- No user account is required, and none is created.
- No advertising networks, no advertising identifier, no cross-app tracking.
- No sale or rental of personal data to anyone.

## Children

FridgeBuddy is rated 4+ and does not knowingly collect personal information from children.

## Changes to this policy

If the app's data practices change, this page will be updated and the "Last updated" date revised. Significant changes will be highlighted in the app's release notes.

## Contact

For any privacy question or request, contact [feedback@cafournier.com](mailto:feedback@cafournier.com).
