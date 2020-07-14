---
layout: post
title: 'Project 2 : Fridge Buddy - Expiration date tracking'
tags: [entrepreneurship, 12 Startups]
image: '/assets/images/posts/2020/project-2-thumbnail.jpg'
featured_image_thumbnail: '/assets/images/posts/2020/project-2-thumbnail.jpg'
featured_image: '/assets/images/posts/2020/project-2-fridge-buddy.jpg'
---

>Fridge Buddy helps you reduce your food waste by alerting you when one of your products is nearing its expiration date.

Fridge Buddy is the second project of my [12 startup challenge](https://cafournier.com/12-startups-challenge). The blog post's is a bit late, I worked on this project for the whole month of february.

## Story behind this project 

The idea came when I had to trash some food due to the expiration date passed. I looked on the App Store to find an app that will helps me managing my groceries and avoid trashing my food. I found few apps that does what I want, add products and send notification when the expiration date is near. I tried them, but there were always something that I didn't like so I decided to make my own version.

For this project I've wanted to follow the [Apple Human Interface Guideline](https://developer.apple.com/design/human-interface-guidelines/) as much as possible. The second main goal is to be able to add a product quickly with few manual actions.

With these two objectives, I started designing the app on Sketch. It's difficult for me to keep a sketch file organised, and this project is not an exception. 

In order to add a product quickly, I've wanted to use the barcode to get all the product metadata. After searching a bit, I found [OpenFoodFacts](https://world.openfoodfacts.org) that match all my needs. I decided to try the new framework [Combine](https://developer.apple.com/documentation/combine) for all the network layer of the app. Since the network layer is light, currently the app is making only one call to the API, it's a good stating point for using Combine. Regarding the notifications, they are only local notifications scheduled when you scan a new product, the app does not rely on third party service for the notifications.

I choosed a freemium business model, the core feature of the app is 100% free. You can scan unlimited products and get notifications for them. There are some small features behind the paywall, creating custom lists, change the sorting settings of the list. The in-app purchases are mainly a tip if you liked the app wanted to support and say thanks.

## Next steps

Since the app already got some users, I manage to get some feedback and to get an idea of the next features the users wants. I will implement them during the next months when I found a bit of time between the other projects.

## Useful links

[FridgeBuddy on the iOS AppStore](https://apps.apple.com/us/app/fridge-buddy-expiry-tracker/id1500190823?ign-mpt=uo%3D4)


