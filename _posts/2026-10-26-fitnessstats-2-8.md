---
layout: post
title: "FitnessStats 2.8: Share your workouts"
description: "FitnessStats 2.8 turns any workout into an image or a video where your route draws itself, and exports your training to ChatGPT, Claude or Gemini for an analysis or a training plan."
tags: [FitnessStats, Release notes]
image: /assets/images/posts/2026/fitnessstats-2-8/cover.jpg
featured_image: /assets/images/posts/2026/fitnessstats-2-8/cover.jpg
twitter:
  card: summary_large_image
featured_image_alt: "FitnessStats 2.8: an iPhone showing a marathon on a satellite map in the share editor, with cards for the Animate route switch and the Copy for AI button."
extra_css:
  - /assets/css/post-demos.css
extra_js:
  - /assets/js/post-demos.js
---
{% assign media = '/assets/images/posts/2026/fitnessstats-2-8/' | relative_url %}
FitnessStats 2.8 is out. This update is about what happens after a workout: sharing it the way you want, as an image or as a video where your route draws itself, and handing your training to your AI assistant for an honest look at it. Here is a quick tour.

<div class="post-feature">
<div class="post-feature-copy" markdown="1">
## Share any workout

Tap a card on your dashboard, then tap one of its workouts: the share editor opens. Pick a layout, a format for stories, posts or a square, and a background: a color, your route on a map or a satellite view, or one of your photos.

Everything on the image can be dragged, pinched and rotated, and you choose which numbers it shows. FitnessStats remembers your choices, so the next workout is ready to share in one tap. Share it, save it to Photos or copy it.

<p class="post-note">The Classic and Summary layouts are free. The other layouts and removing the watermark come with FitnessStats Premium.</p>
</div>
<figure class="post-phone-figure">
    <div class="post-phone">
        <div class="post-phone-screen">
            <video src="{{ media }}share.mp4" poster="{{ media }}share-poster.webp" data-still="11" width="600" height="1304" autoplay muted loop playsinline preload="auto" aria-label="FitnessStats screen recording: opening a 105 km ride from the Distance card, switching its layout, then trying a dark map and a blue background."></video>
        </div>
        {% include post-demo-toggle.html %}
    </div>
    <figcaption>A 105 km ride, from layout to background.</figcaption>
</figure>
</div>

<div class="post-feature post-feature-flip">
<div class="post-feature-copy" markdown="1">
## Your route, drawn as a video

Turn on **Animate route** in the Data tab, and Share or Save to Photos make a short video instead of an image: your route draws itself on the map, ready for a story. On long routes the camera follows you, then pulls back at the end to show the whole thing.

Triathlons get the same treatment. The swim, the ride and the run draw one after the other, each with its own badge, and the image can show the distance and time of every leg.
</div>
<figure class="post-phone-figure">
    <div class="post-phone">
        <div class="post-phone-screen">
            <video src="{{ media }}route.mp4" poster="{{ media }}route-poster.webp" data-still="13.3" width="600" height="1304" autoplay muted loop playsinline preload="auto" aria-label="FitnessStats screen recording: turning on Animate route for a marathon, then the route drawing itself on a satellite map of Paris."></video>
        </div>
        {% include post-demo-toggle.html %}
    </div>
    <figcaption>A marathon across Paris, drawing itself.</figcaption>
</figure>
</div>

<div class="post-feature">
<div class="post-feature-copy" markdown="1">
## Export to AI

ChatGPT, Claude and Gemini are good at reading a training log, as long as you give them one. Open your profile and choose **Export to AI**. Pick what you want to know: an analysis of your progress, a review of your training, a 4-week training plan, or just the data. Choose a period and an activity, tap **Copy for AI**, then paste it into your assistant.

The summary holds your totals, weekly volume, records and consistency, and the request is written in your language so the answer comes back in it. Nothing leaves your iPhone until you paste or share it, and GPS routes, device names and Health identifiers are never included.

In Shortcuts, the new **Get Workout Summary** action returns the same summary, so an automation can hand it to your AI app.

<p class="post-note">Periods up to 90 days are free. Longer periods, and the raw CSV and JSON export, come with Premium.</p>
</div>
<figure class="post-phone-figure">
    <div class="post-phone">
        <div class="post-phone-screen">
            <video src="{{ media }}ai.mp4" poster="{{ media }}ai-poster.webp" data-still="10.5" width="600" height="1304" autoplay muted loop playsinline preload="auto" aria-label="FitnessStats screen recording: opening Export to AI from the profile, choosing Build a training plan and the last 90 days, then tapping Copy for AI."></video>
        </div>
        {% include post-demo-toggle.html %}
    </div>
    <figcaption>A training plan request, copied for your AI.</figcaption>
</figure>
</div>

## Also in this update

- Triathlons now count their distance, calories and elevation gain in your stats.
- Tapping a dashboard card opens a cleaner detail: the headline figure, a chart over your period and the workouts behind it.
- Your profile now groups Export to AI and Share workouts under Tools.
- The upgrade screen and the widgets are now fully translated in every language FitnessStats speaks.
- FitnessStats now requires iOS 26.

<div class="post-app-cta">
    <img src="{{ '/assets/app-pages/fitnessstats-icon.png' | relative_url }}" width="64" height="64" alt="" decoding="async">
    <div class="post-app-cta-copy">
        <strong>FitnessStats</strong>
        <span>Statistics for your Apple Health workouts</span>
    </div>
    <a class="post-app-cta-badge" href="https://apps.apple.com/app/apple-store/id6445907634?pt=2162580&amp;ct=cafournier&amp;mt=8"><img src="{{ '/assets/app-pages/appstore.svg' | relative_url }}" width="120" height="40" alt="Download FitnessStats on the App Store"></a>
</div>
