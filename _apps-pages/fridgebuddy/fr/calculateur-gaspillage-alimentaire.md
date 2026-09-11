---
layout: fridgebuddy-page
permalink: /fridgebuddy/fr/calculateur-gaspillage-alimentaire/
lang: fr
title: "Calculateur du coût du gaspillage alimentaire"
page_title: "Calculateur de gaspillage alimentaire & économies | FridgeBuddy"
meta_description: "Estimez le coût annuel du gaspillage alimentaire évitable de votre foyer et les économies possibles, à partir de votre propre budget courses."
canonical_path: /fridgebuddy/fr/calculateur-gaspillage-alimentaire/
hreflang:
  en: /fridgebuddy/food-waste-calculator/
  fr: /fridgebuddy/fr/calculateur-gaspillage-alimentaire/
  de: /fridgebuddy/de/lebensmittelverschwendung-rechner/
eyebrow: "Calculateur gratuit, privé, 100 % dans votre navigateur"
intro: "Saisissez vos dépenses de courses et votre propre estimation de ce qui part à la poubelle. Le calculateur affiche le coût annuel possible et ce qu'une réduction réaliste garderait dans votre budget."
schema_type: calculator
ios_app_id: 1500190823
app_name: FridgeBuddy
app_icon: /assets/app-pages/fridgebuddy-icon.png
social_image: /assets/app-pages/fridgebuddy-icon.png
calculator_script: /assets/js/food-waste-calculator.js
hide_hero_cta: true
date_published: 2026-08-30
date_modified: 2026-08-30
date_modified_display: "30 août 2026"
breadcrumbs:
  - name: FridgeBuddy
    url: /fridgebuddy/fr/
  - name: Calculateur de gaspillage
    url: /fridgebuddy/fr/calculateur-gaspillage-alimentaire/
related_links:
  - title: "Suivi des dates de péremption"
    description: "Transformez les dates en rappels pendant qu'il est temps d'agir."
    url: /fridgebuddy/fr/suivi-date-peremption/
  - title: "Inventaire de cuisine"
    description: "Voyez ce qui est déjà à la maison avant d'acheter plus."
    url: /fridgebuddy/fr/inventaire-cuisine/
  - title: "Comparatif d'applications"
    description: "Trouvez l'approche de suivi qui correspond à votre routine."
    url: /fridgebuddy/fr/comparatif/
---

<div class="fb-calculator" id="food-waste-calculator">
  <div class="fb-calculator-grid">
    <div class="fb-field">
      <label for="calculator-currency">Devise</label>
      <select id="calculator-currency">
        <option value="EUR" selected>EUR (€)</option>
        <option value="USD">USD ($)</option>
        <option value="GBP">GBP (£)</option>
        <option value="CAD">CAD ($)</option>
        <option value="CHF">CHF</option>
      </select>
    </div>
    <div class="fb-field">
      <label for="weekly-grocery-spend">Dépenses de courses moyennes par semaine</label>
      <input id="weekly-grocery-spend" type="number" min="0" step="1" inputmode="decimal" value="150">
    </div>
    <div class="fb-field">
      <label for="waste-percentage">Part estimée non consommée (%)</label>
      <input id="waste-percentage" type="number" min="0" max="100" step="1" inputmode="decimal" value="15">
      <small>Utilisez votre propre estimation. « Non consommée » peut inclure la nourriture jetée, périmée ou oubliée.</small>
    </div>
    <div class="fb-field">
      <label for="reduction-percentage">Réduction qui vous semble réaliste (%)</label>
      <input id="reduction-percentage" type="number" min="0" max="100" step="1" inputmode="decimal" value="30">
      <small>Il s'agit de la part de votre gaspillage estimé actuel que vous espérez éviter — pas de vos dépenses totales.</small>
    </div>
  </div>

  <div class="fb-calculator-results" aria-live="polite">
    <div class="fb-result">
      <span>Dépenses de courses annuelles estimées</span>
      <strong id="annual-grocery-spend">7 800 €</strong>
    </div>
    <div class="fb-result">
      <span>Gaspillage alimentaire annuel estimé</span>
      <strong id="annual-waste-cost">1 170 €</strong>
    </div>
    <div class="fb-result">
      <span>Économies annuelles potentielles</span>
      <strong id="annual-potential-savings">351 €</strong>
    </div>
  </div>
  <p class="fb-calculator-summary" id="calculator-summary">Réduire votre gaspillage estimé de 30 % pourrait garder environ 29 € par mois dans votre budget.</p>
  <noscript><p>Activez JavaScript pour utiliser le calculateur. Aucune donnée n'est envoyée : les calculs s'exécutent dans votre navigateur.</p></noscript>
</div>

## Comment l'estimation est calculée

Le calculateur n'utilise que les valeurs que vous saisissez :

1. **Dépenses annuelles de courses** = dépenses hebdomadaires × 52
2. **Gaspillage alimentaire annuel estimé** = dépenses annuelles × part non consommée
3. **Économies potentielles** = gaspillage annuel estimé × pourcentage de réduction réaliste

Il n'utilise pas de moyenne nationale, n'inspecte pas vos achats et n'envoie pas vos saisies vers un serveur. Le résultat est une estimation de planification, ni une garantie ni une évaluation financière.

Pour situer l'ampleur du problème : selon le [rapport Food Waste Index 2024 du Programme des Nations unies pour l'environnement](https://www.unep.org/resources/publication/food-waste-index-report-2024), les ménages du monde entier ont gaspillé environ 631 millions de tonnes de nourriture en 2022 — près de 79 kg par personne et par an, soit environ 60 % de tout le gaspillage alimentaire (commerce, restauration et foyers confondus).

## Transformez l'estimation en petite expérience

Un chiffre annuel peut sembler abstrait. Commencez par un changement répétable pendant quatre semaines :

- Suivez les aliments que votre foyer oublie le plus souvent.
- Consultez ce qui expire bientôt avant de prévoir les repas.
- Cherchez dans l'inventaire avant de faire les courses.
- Déplacez les produits à racheter vers une liste de courses partagée.
- Repérez les produits régulièrement marqués comme gaspillés.

Puis mettez à jour le calculateur avec une estimation plus informée. L'objectif n'est pas une comptabilité parfaite : c'est assez de visibilité pour décider si la nouvelle routine vous aide.

## Où FridgeBuddy intervient

FridgeBuddy ne peut pas garantir des économies. Il soutient les comportements derrière l'estimation : garder la nourriture visible, envoyer des rappels de péremption, partager l'inventaire avec le foyer et montrer les habitudes de consommation et de gaspillage.

Si les dates sont votre principal défi, commencez par le [guide du suivi des dates de péremption](/fridgebuddy/fr/suivi-date-peremption/). Si les achats en double sont le vrai problème, lisez le [guide de l'inventaire de cuisine](/fridgebuddy/fr/inventaire-cuisine/).
