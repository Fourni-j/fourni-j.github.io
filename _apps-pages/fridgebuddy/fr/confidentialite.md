---
layout: fridgebuddy-page
permalink: /fridgebuddy/fr/confidentialite/
lang: fr
title: Politique de confidentialité
page_title: "Politique de confidentialité FridgeBuddy"
meta_description: "Comment FridgeBuddy traite vos données : inventaire stocké dans votre iCloud privé, aucun compte requis, pas de publicité, pas de pistage, aucune vente de données."
canonical_path: /fridgebuddy/fr/confidentialite/
hreflang:
  en: /fridgebuddy/privacypolicy
  fr: /fridgebuddy/fr/confidentialite/
  de: /fridgebuddy/de/datenschutz/
schema_type: web_page
ios_app_id: 1500190823
app_name: FridgeBuddy
app_icon: /assets/app-pages/fridgebuddy-icon.png
hide_hero_cta: true
date_modified: 2026-11-05
date_modified_display: "5 novembre 2026"
breadcrumbs:
  - name: FridgeBuddy
    url: /fridgebuddy/fr/
  - name: Politique de confidentialité
    url: /fridgebuddy/fr/confidentialite/
---

**Dernière mise à jour :** 5 novembre 2026

*Cette traduction est fournie à titre d'information. En cas de divergence, la [version anglaise](/fridgebuddy/privacypolicy) fait foi.*

Cette politique de confidentialité décrit la manière dont l'application FridgeBuddy (« FridgeBuddy », « l'application ») traite vos informations. FridgeBuddy est développée par Charles-Adrien Fournier, développeur indépendant basé à Paris, France, responsable des traitements décrits ici. Vous pouvez me joindre à [feedback@cafournier.com](mailto:feedback@cafournier.com).

En résumé : votre inventaire alimentaire vous appartient. Il est stocké sur votre appareil et dans votre espace iCloud privé, auquel je n'ai pas accès. FridgeBuddy ne demande aucun compte, n'affiche aucune publicité, ne vend pas de données personnelles et ne vous suit pas d'une application à l'autre. Pour fonctionner, elle s'appuie sur quelques services, présentés ci-dessous avec les données que chacun reçoit.

## Les données que vous ajoutez dans l'application

Les éléments que vous suivez (produits, dates de péremption, lieux de stockage, photos, notes, listes de courses, historique de consommation et de gaspillage) sont stockés :

- **Sur votre appareil**, pour que l'application fonctionne hors ligne.
- **Dans votre base de données iCloud privée (Apple CloudKit)**, pour que votre inventaire se synchronise entre vos appareils Apple et reste disponible si vous changez d'appareil. Ces données sont liées à votre compte Apple et ne sont pas accessibles au développeur.

Si vous partagez votre foyer, ses lieux de stockage, ses articles et ses listes de courses sont partagés avec les personnes que vous invitez, via le partage iCloud. Vous pouvez arrêter le partage à tout moment depuis l'application ou les réglages iCloud.

## Recherche de produits

Lorsque vous scannez un code-barres, l'application l'envoie à [Open Food Facts](https://world.openfoodfacts.org), une base de données produits en ligne, pour récupérer le nom, l'image et les informations nutritionnelles du produit (dont le Nutri-Score et le Green-Score quand ils sont disponibles). Les images des produits sont ensuite chargées depuis les serveurs d'Open Food Facts. Seul le code-barres est transmis, et FridgeBuddy ne l'associe pas à votre identité. Les produits introuvables en ligne peuvent être enregistrés sur votre appareil et réutilisés localement.

## Rappels de produits

Lorsque vous ajoutez un article ou ouvrez sa fiche, l'application envoie son code-barres à [RappelConso](https://rappel.conso.gouv.fr/), la base officielle des rappels de produits en France, pour vous prévenir si le produit fait l'objet d'un rappel. Seul le code-barres est transmis. Vous pouvez désactiver cette vérification dans Réglages > Inventaire > Vérifier les rappels de produits.

## Photos de tickets et d'étagères

Lorsque vous ajoutez des articles depuis un ticket de caisse ou une photo d'étagère, la photo est analysée pour y trouver les produits. Selon votre appareil et votre version d'iOS, cette analyse se fait sur votre appareil ou avec [Private Cloud Compute](https://security.apple.com/blog/private-cloud-compute/) d'Apple, conçu par Apple pour que vos données servent uniquement à répondre à la demande, sans être conservées ni rendues accessibles à Apple. La photo n'est jamais envoyée ni à moi ni à un autre service.

Les autres fonctions Apple Intelligence de FridgeBuddy, comme les idées de repas, les conseils de Statistiques et le nettoyage des noms de produits, s'exécutent sur votre appareil.

## Achats

FridgeBuddy est gratuite au téléchargement et propose des achats et abonnements optionnels, payés via l'App Store d'Apple. Les données de paiement ne me parviennent jamais : Apple traite toutes les transactions.

Pour savoir à quels achats vous avez droit, l'application utilise RevenueCat. RevenueCat reçoit votre historique d'achats (produits, dates, renouvellements, résiliations et remboursements), un identifiant aléatoire créé par l'application à son premier lancement, et des informations techniques comme la version de l'application, la version d'iOS et le pays de l'App Store. Si vous avez installé FridgeBuddy depuis une publicité Apple Ads, RevenueCat reçoit aussi d'Apple la campagne à l'origine de l'installation, pour que je sache quelles campagnes fonctionnent. Aucun identifiant publicitaire n'est utilisé.

## Statistiques d'utilisation

Pour comprendre quelles fonctions sont utilisées et corriger les problèmes, l'application envoie des événements d'utilisation à Mixpanel, par exemple qu'un article a été ajouté par scan, qu'un scan a échoué ou que l'écran d'abonnement s'est affiché. Ces événements portent le même identifiant aléatoire, des informations techniques comme la version de l'application, la version d'iOS et le modèle d'appareil, ainsi que des nombres ou des codes d'erreur. Ils ne contiennent aucun nom de produit, code-barres, note ni photo. RevenueCat envoie aussi à Mixpanel les événements d'achat (début d'essai, renouvellement, résiliation…) sous le même identifiant.

Ces données sont stockées dans l'Union européenne (hébergement européen de Mixpanel). Jusqu'à FridgeBuddy 2.35, Mixpanel utilisait votre adresse IP pour estimer votre localisation approximative (ville, région et pays) ; depuis FridgeBuddy 2.36, ce n'est plus le cas. Comme le même identifiant figure dans les e-mails au support (voir plus bas), ces données sont liées à vous dès que vous me contactez.

## Suggestions de fonctionnalités

Réglages > Suggérer une fonctionnalité ouvre un tableau public géré par WishKit. Les suggestions, commentaires et votes que vous publiez sont envoyés à WishKit avec un identifiant WishKit aléatoire, et les autres utilisateurs de FridgeBuddy peuvent les voir. Jusqu'à FridgeBuddy 2.35, le tableau proposait un champ e-mail facultatif ; depuis FridgeBuddy 2.36, il ne demande plus votre adresse e-mail. Évitez d'y inclure des informations personnelles.

## E-mails au support

Lorsque vous écrivez depuis Réglages > Nous contacter, votre application de messagerie envoie le message depuis votre propre adresse. L'application préremplit un pied de message avec vos versions de l'application et d'iOS, le modèle d'appareil, la langue, l'état de l'abonnement, du foyer et d'iCloud, et votre Support ID, c'est-à-dire l'identifiant aléatoire décrit plus haut. Il m'aide à étudier votre problème, et vous pouvez le modifier ou le supprimer avant l'envoi.

## Notifications

Les rappels de péremption sont programmés localement sur votre appareil. Ils ne nécessitent l'envoi d'aucune donnée vers un serveur.

## Export et suppression des données

Vous pouvez exporter votre inventaire au format CSV à tout moment depuis l'application ; l'export est créé sur votre appareil et partagé uniquement là où vous le décidez. Supprimer un article, un lieu de stockage ou les données iCloud de l'application les retire de votre base privée. Vous pouvez aussi désactiver la synchronisation iCloud de FridgeBuddy dans les réglages iOS.

## Destinataires des données

- **Apple** (iCloud, App Store, Private Cloud Compute, attribution Apple Ads), selon [la politique de confidentialité d'Apple](https://www.apple.com/fr/legal/privacy/).
- **Open Food Facts** (France) : codes-barres et demandes d'images de produits.
- **RappelConso**, service de l'État français (France) : codes-barres pour la vérification des rappels.
- **RevenueCat, Inc.** (États-Unis) : historique d'achats, identifiant aléatoire et informations techniques, stockés aux États-Unis. Ces transferts reposent sur les clauses contractuelles types de la Commission européenne.
- **Mixpanel** : événements d'utilisation, stockés dans l'Union européenne.
- **WishKit LLC** (États-Unis) : suggestions, commentaires et votes, stockés aux États-Unis.

## Bases légales et durées de conservation

Au sens du Règlement général sur la protection des données (RGPD) :

- **Les fonctions que vous utilisez** (synchronisation, recherche de produits, vérification des rappels, analyse des photos, achats) reposent sur l'exécution du service que vous demandez (article 6, paragraphe 1, b).
- **Les statistiques d'utilisation et l'attribution Apple Ads** reposent sur mon intérêt légitime à améliorer l'application et à savoir quelles campagnes fonctionnent (article 6, paragraphe 1, f). Vous pouvez vous y opposer à tout moment.
- **Les suggestions et les e-mails au support** reposent sur mon intérêt légitime à répondre à ce que vous choisissez de m'envoyer (article 6, paragraphe 1, f).

Les données d'achat sont conservées le temps nécessaire pour fournir vos achats et respecter les obligations comptables. Les événements d'utilisation sont conservés tant qu'ils aident à comprendre l'usage de l'application. Les e-mails au support sont conservés le temps de traiter votre demande et son suivi. Les suggestions restent sur le tableau jusqu'à ce que vous ou moi les retirions. Toutes ces données sont supprimées sur demande, dans les limites des obligations légales.

## Vos droits

Vous pouvez demander à accéder à vos données, à les rectifier ou à les supprimer, à limiter leur traitement ou à vous y opposer, et à les recevoir dans un format portable. FridgeBuddy n'ayant pas de compte, indiquez votre Support ID (il figure dans tout e-mail envoyé depuis Réglages > Nous contacter) : il me permet de retrouver les données d'achat et de statistiques qui y sont liées. Écrivez à [feedback@cafournier.com](mailto:feedback@cafournier.com) ; je réponds sous un mois. Les données de votre iCloud restent sous votre contrôle et peuvent être supprimées depuis l'application ou les réglages iOS.

Vous pouvez aussi introduire une réclamation auprès de la [CNIL](https://www.cnil.fr) ou de l'autorité de protection des données de votre pays.

## Ce que FridgeBuddy ne fait pas

- Aucun compte utilisateur n'est requis, et aucun n'est créé.
- Pas de régies publicitaires, pas d'identifiant publicitaire, pas de pistage inter-applications.
- Aucune vente ni location de données personnelles à qui que ce soit.

## Enfants

FridgeBuddy est classée 4+ et ne collecte pas sciemment d'informations personnelles auprès d'enfants.

## Modifications de cette politique

Si les pratiques de l'application concernant les données évoluent, cette page sera mise à jour et la date de « Dernière mise à jour » révisée. Les changements significatifs seront signalés dans les notes de version de l'application.

## Contact

Pour toute question ou demande relative à la confidentialité, contactez [feedback@cafournier.com](mailto:feedback@cafournier.com).
