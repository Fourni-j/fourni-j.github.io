---
layout: post
title: 'Project 1 : ShowcaseMe - Work portfolio'
tags: [entrepreneurship, 12 Startups]
image: '/assets/images/posts/2020/project-1-thumbnail.jpg'
featured_image_thumbnail: '/assets/images/posts/2020/project-1-thumbnail.jpg'
featured_image: '/assets/images/posts/2020/project-1-showcaseme.jpg'
---

>ShowcaseMe is an app that will helps you creating a nice (local) portfolio to showcase all your work. Whether you’re a photographer, a web designer or even a cook, use ShowcaseMe to centralize and present all your best visuals in an elegant manner.

This project is the first one of my [12 startup challenge](https://cafournier.com/12-startups-challenge). The blog post's is a bit late, I worked on this project for the whole month of january.

## Story behind this project 

The first version of ShowcaseMe was developped a few years ago. I stopped working on this project right after it reaches the App Store. For the first month of the challenge I decided to work again on ShowcaseMe and update the app in order to get it working properly and maybe generate a few bucks with IAP's. 

With this first project, I've wanted to try some of the news API available on iOS 13.

First of all, I tried [Catalyst](https://developer.apple.com/mac-catalyst/) (converting an iOS app to a MacOS app easily). It was nice discovery and the release process is noticeably the same as an iOS app. At the time I was working on this, we had to create a new bundle for the MacOS app with specific IAP's, that was kind of annoying. Since Xcode 11.4, we can share the same bundle ID as the iOS app. It simplify a lot the whole process.

I also implemented the Sign In with Apple, with the Firebase supporting it, it was really easy to implement in the project and to use next to the already available login options.

Since the app is iOS 13 only, I implemented the new Dark Mode natively with the colors provided by iOS. I also had to support keyboard input, at least the arrows. 

When the project was ready, I deep dive into the ASO's world and started learning on this topic. I'm far from mastering the ASO side but I will take some time on each project to improve my knowledge.

## Next steps

Let the project lives for the next few months. As I'm currently using Firebase as a backend, when I will get closer to the quota's, I will considering keeping it maybe transferring it on a new backend developed on my own or shutting it down.

## Useful links

[ShowcaseMe on the iOS AppStore](https://apps.apple.com/us/app/showcaseme-work-portfolio/id1355919671?uo=4) / [ShowcaseMe on the MacOS AppStore](https://apps.apple.com/us/app/showcaseme-work-portfolio/id1492714162?ls=1&mt=12)

[ShowcaseMe website](https://showcaseme.fr)

[Product Hunt post](https://www.producthunt.com/posts/showcaseme)



