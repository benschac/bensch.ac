---
title: What I Learned by Fixing One Line of CSS in an Open Source Project
description: >-
  I was browsing the Svelte docs on my iPhone and came across a blaring UI bug. The notch in the REPL knob was totally out of whack.
date: 2020-08-14T16:52:45.617Z
tags:
  - 'css-tricks'
  - 'svelte'
  - 'OSS'
categories: ['svelte', 'css', 'open source']
draft: false
author: 'Benjamin Schachter'
---

I was browsing the Svelte docs on my iPhone and came across a blaring UI bug. The notch in the REPL knob was totally out of whack. I’m always looking to contribute to open source, and I thought this would be a quick and easy fix. Turns out, there was a lot more to it than just changing one line of CSS.

Replicating, debugging, setting up the local environment was interesting, difficult, and meaningful.

## The issue

I opened my browser DevTools, thinking I’d see the same issue in the phone view. But, the bug wasn’t there. Now this is a seriously tricky CSS problem.
<Image src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/08/ihImcmuZ-e1596731348673.png?w=996&ssl=1" width={400} height={500}/>

### What I learned

If you’re using Chrome on iOS as your browser, you’re still using Safari’s renderer. From Wikipedia:

> Chrome uses the iOS WebKit – which is Apple’s own mobile rendering engine and components, developed for their Safari browser – therefore it is restricted from using Google’s own V8 JavaScript engine.

This is backed up by caniuse, which provides this note on iPS Safari:
<Image src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/08/WFsZdUZQ.png?w=1094&ssl=1" width={700} height={400} />

## Reproduce the issue locally

I pulled down the project and ran it locally. I confirmed it was still an issue by running the local code in a simulator as well as on my actual iPhone. Safari on macOS has an easy way to open up DevTools instances of each one.
<Image src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/08/tZdY1TcQ.png?w=1720&ssl=1" width={900} height={400} />

This provides access to a console just like you would in the browser but for iOS Safari. I’m not going to lie, Apple’s developer experience is top notch (see what I did there? 😬).

I’m able to reproduce the issue locally now.

### What I learned

After pulling down the Svelte repo and looking around the code a bit, I noticed the UI and SVGs were being pulled in via a package called @sveltejs/site-kit. Great, now I need my local version of site kit to get pulled into svelte/site so I can see changes and debug the issue.

I needed to point the node_modules in Svelte’s package.json to my local copy of site-kit. This sounded like a Symlink. After looking through the docs without much luck I Googled around and stumbled upon npm-link. That let me see what I was doing!
<Image src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/08/Qfn4njbt-e1596731109819.png?w=1136&ssl=1" width={500} height={700} />

I can now make local changes to site-kit and see them reflected in the Svelte project.

## Solving the issue

Seriously, all this needed was a one-line change:
`border: transparent;`

But locating where that one line should go was not as straightforward as you’d think. Source maps on the project are still a little rough around the edges and are showing this CSS coming from the Nav.svelte component when it was really coming from another file. That would be another great way to contribute to the project!

Then you search around and learn that this is being handled and you learn a little more about how it’s done. Everything now looks great on mobile and desktop.
<Image src="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/08/30PkHlpP.gif?resize=802%2C478&ssl=1" width={600} height={500}/>

## Let’s rewind

What started as a quick, one-line change became a bit of a journey. I had to:

- Run the project and component repositories
- Learn about system linking
- Contribute documentation about lining to site-kit
- Learn about different browser renderers
- Learn how to emulate an iOS Safari browser
- Learn how to get access to its debugger
- Find the issue when source maps weren’t working correctly
- Fix the issue (finally!)

Working on your own, you normally don’t get to deal with issues like this, or have a large complex system you need to build a mental model of and learn. You don’t get to learn from maintainers. Most importantly, you don’t see all of the hard work that goes into building a popular technical product.

When I submitted this idea to CSS-Tricks. Chris said he had recently dealt with a similar situation. Difficult learning is durable learning. Embrace the struggle.

## Never stop learning

I grabbed another issue from the Svelte project and now I’m learning about CSSStyleSheet because there’s another issue (I think), with how Safari handles keyframe animations within stylemanager.ts. And so the learning continues down paths I never would have trod in my day-to-day work.

When something breaks, enjoy the journey of learning the system. You’ll gain valuable insights into why that thing broke and what can be done to fix it. That’s one of the awesome benefits of contributing to open source projects and why I’d encourage you to do the same.
