---
layout: fridgebuddy-page
permalink: /fridgebuddy/food-waste-calculator/
lang: en-US
title: "Household food-waste cost calculator"
page_title: "Food Waste Cost & Savings Calculator | FridgeBuddy"
meta_description: "Estimate the annual cost of avoidable household food waste and the possible savings from reducing it, using your own grocery budget and assumptions."
eyebrow: "Free, private, client-side calculator"
intro: "Enter your grocery spending and your own estimate of what goes unused. The calculator shows the possible annual cost and what a realistic reduction could keep in your budget."
schema_type: calculator
ios_app_id: 1500190823
app_name: FridgeBuddy
app_icon: /assets/app-pages/fridgebuddy-icon.png
social_image: /assets/app-pages/fridgebuddy-og.png
calculator_script: /assets/js/food-waste-calculator.js
hide_hero_cta: true
breadcrumbs:
  - name: FridgeBuddy
    url: /fridgebuddy/
  - name: Food-waste calculator
    url: /fridgebuddy/food-waste-calculator/
related_links:
  - title: "Food expiration tracker"
    description: "Turn dates into reminders while there is time to act."
    url: /fridgebuddy/food-expiration-tracker/
  - title: "Pantry inventory app"
    description: "See what is already at home before buying more."
    url: /fridgebuddy/pantry-inventory-app/
  - title: "Compare pantry apps"
    description: "Find the tracking approach that fits your routine."
    url: /fridgebuddy/alternatives/
date_published: 2026-08-30
date_modified: 2026-08-30
hreflang:
  en: /fridgebuddy/food-waste-calculator/
  fr: /fridgebuddy/fr/calculateur-gaspillage-alimentaire/
---

<div class="fb-calculator" id="food-waste-calculator">
  <div class="fb-calculator-grid">
    <div class="fb-field">
      <label for="calculator-currency">Currency</label>
      <select id="calculator-currency">
        <option value="EUR" selected>EUR (€)</option>
        <option value="USD">USD ($)</option>
        <option value="GBP">GBP (£)</option>
        <option value="CAD">CAD ($)</option>
        <option value="AUD">AUD ($)</option>
      </select>
    </div>
    <div class="fb-field">
      <label for="weekly-grocery-spend">Average grocery spend per week</label>
      <input id="weekly-grocery-spend" type="number" min="0" step="1" inputmode="decimal" value="150">
    </div>
    <div class="fb-field">
      <label for="waste-percentage">Estimated share that goes unused (%)</label>
      <input id="waste-percentage" type="number" min="0" max="100" step="1" inputmode="decimal" value="15">
      <small>Use your own estimate. “Unused” can include food discarded, spoiled, or forgotten.</small>
    </div>
    <div class="fb-field">
      <label for="reduction-percentage">Reduction you think is realistic (%)</label>
      <input id="reduction-percentage" type="number" min="0" max="100" step="1" inputmode="decimal" value="30">
      <small>This is the portion of your current estimated waste you hope to avoid—not your total grocery spending.</small>
    </div>
  </div>

  <div class="fb-calculator-results" aria-live="polite">
    <div class="fb-result">
      <span>Estimated annual grocery spend</span>
      <strong id="annual-grocery-spend">€7,800</strong>
    </div>
    <div class="fb-result">
      <span>Estimated annual food waste</span>
      <strong id="annual-waste-cost">€1,170</strong>
    </div>
    <div class="fb-result">
      <span>Potential annual savings</span>
      <strong id="annual-potential-savings">€351</strong>
    </div>
  </div>
  <p class="fb-calculator-summary" id="calculator-summary">Reducing your estimated waste by 30% could keep about €29 per month in your budget.</p>
  <noscript><p>Enable JavaScript to use the calculator. No data is sent anywhere; calculations run in your browser.</p></noscript>
</div>

## How the estimate works

The calculator uses only the values you enter:

1. **Annual grocery spending** = weekly grocery spending × 52
2. **Estimated annual food waste** = annual grocery spending × estimated unused percentage
3. **Potential savings** = estimated annual food waste × realistic reduction percentage

It does not use a national average, inspect your purchases, or send your inputs to a server. The result is a planning estimate, not a guarantee or financial assessment.

For context on the scale of the problem: according to the [UN Environment Programme's Food Waste Index Report 2024](https://www.unep.org/resources/publication/food-waste-index-report-2024), households worldwide wasted an estimated 631 million tonnes of food in 2022 — about 79 kg per person per year, or roughly 60% of all food wasted across retail, food service, and homes.

## Turn the estimate into a smaller experiment

An annual number can feel abstract. Start with one repeatable change for four weeks:

- Track the foods your household most often forgets.
- Check what expires soon before planning meals.
- Search the pantry inventory before shopping.
- Move items that need restocking into a shared shopping list.
- Review which products were repeatedly marked as wasted.

Then update the calculator with a more informed waste estimate. The goal is not perfect accounting; it is enough visibility to decide whether the new routine is helping.

## Where FridgeBuddy fits

FridgeBuddy cannot guarantee savings. It supports the behaviors behind the estimate by keeping food visible, sending expiration reminders, sharing inventory with the household, and showing consumption and waste patterns.

If dates are your main challenge, start with the [food expiration tracker guide](/fridgebuddy/food-expiration-tracker/). If duplicate purchases are the bigger issue, read the [pantry inventory guide](/fridgebuddy/pantry-inventory-app/).
