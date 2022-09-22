---
title: Here’s what I’ve learned nine months into my software engineering job
description: >-
  I’ve been working for about nine months at Dexter as a software developer. I
  wrote a blog post about landing the job initially, as well as…
date: '2018-01-28T16:52:45.617Z'
tags:
  - post
keywords: []
author: 'Benjamin Schachter'
draft: false
ogImage:
  url: '/assets/blog/preview/cover.jpg'
---

![](/Users/benjaminschachter/Downloads/medium-export-53ea0a62798a34a070e02ba6c20fabcaa79f4d6071252b2620cbac428dd8bde9/posts/md_1652096354662/img/1__1NQVuCFgkbmUE0lWNI__dnw.jpeg)

I’ve been working for about nine months at [Dexter](https://medium.com/u/10e7d71b6655) as a software developer. I wrote a blog post about [landing the job initially](https://medium.freecodecamp.org/how-i-got-my-first-dev-job-and-what-im-going-to-do-next-4837b1e9c89c), as well as a technical post about a [self positioning component](https://hackernoon.com/self-positioning-react-components-7e5d99e9349f) I made in my first couple of months at the company. Getting a job was my initial goal, and keeping it and growing as a developer was the natural next step forward.

My thoughts about my role have changed significantly since I started. I thought being a developer was about cranking out code as quickly as possible. It’s the furthest thing from reality. Banging out a lot of crappy code quickly isn’t a scalable way to build a business or a career in development. Luckily, I found an employer who felt the same way, and whose product is software.

The goal is to write just the right amount of good code and communicate well. You’re not paid to code, you’re paid to think and figure out problems. The byproduct is crystallized thought and instruction for a machine to follow in the form of code. I’d rather solve a problem in one line of clear readable code than 10 lines of code that’s difficult to understand. I’d rather solve a problem in 5 lines of readable commented code than one line of highly complex, multi-nested code with multiple ternary operators. You get the idea.

### Ask lots of questions, and document the answers

My boss sent me [this](https://dev.to/andrewsmith1996/do-you-ever-get-frustrated-with-your-junior-developers-b84) link which encapsulated a lot of the stress and anxiety I feel as a new engineer. It’s an understatement to say I’m very self-conscious about asking questions.

I use this checklist before asking others for help:

- Is this a question that I’ve asked before, and if so, where did I document the answer?
- Is this something I could Google?
- Is this documented somewhere by someone else internally?
- What’s going on here? What’s the root cause of the error or unexpected behavior that I’m experiencing?
- Do I really understand the question I’m trying to answer? It’s okay to take some time and read over the problem again rather than giving a half-ass or rushed answer.

After following these steps, I solve the problem on my own, find a documented solution, or ask a question with much better context and detail which makes it easier for someone else to help me. Even better, if I ask a good question and it can be answered over chat, my teammate doesn’t need to drop everything to help me.

If I’ve gone 90% of the way towards solving the problem and just need the last 10% of help, a senior developer is going to be happy to help knowing that I got as far as I could on my own. Looking for someone else to solve your problems isn’t a great way to build trust within your team.

Smart people like good questions — so ask them.

### Avoid making the same mistakes and asking the same questions over and over again

This is easier said than done, and could be true for any job, not just programming. A lot of new concepts and information are being thrown your way, and making mistakes is inevitable. Be aware of that. Think before you ask. Google stuff. Look at the docs. They’re your friend. If you see a trend, try and identify it. Make an active effort to catch yourself asking the same type of question. Write it down, and make it a goal to fix it.

Make sure that the next time you come across the same issue you know what to do. We all make mistakes, but being self-aware and making an effort to change is how everyone gets better.

### Review Your Work, Always

No one likes going through a PR and telling you to remove your console.logs and debuggers or telling you to fix linting errors. I wouldn’t publish this post without reading it over a couple of times and having a friend take a look, too.

Really look at your code and ask yourself these questions:

- I wrote a complex piece of logic. Is there similar functionality in the application that maybe does this in a more readable, flexible, or generic way?
- If not, would I remember why I wrote this code in a week? If the answer is no, I probably want to change the code or comment it. The person reviewing the PR should have some context into why I made that decision.
- Make sure your code is passing linting and tests before giving it to anyone else.
- Am I repeating myself? Can I encapsulate the logic I’m repeating into a function?
- If this was someone else’s code that I was reviewing, what comments would I make? What would I want to change to make it more straight-forward?

Look at your code with a fresh set of eyes (maybe the next day). Is there specific logic bleeding into components that shouldn’t be? Is your component handling business logic that should go into a container?

Additionally, good self code review saves time and money for the company. It’s way cheaper for you to find your own bugs and fix them yourself rather than having someone else find them two days later.

Last thing about reviewing your code. Touch and click EVERYTHING that you worked on. I want the code I send to anyone to be super hard to break. If they click a new page and get a big error or white screen of death it shows that I haven’t really reviewed my work. Grep for the code you edited and really make sure you didn’t break something else with your addition to a shared component.

It might seem silly, but large code bases are complex and you might not realize you break something until you do.

Seriously, you don’t want to see the first draft of this blog post :)

### Nothing is magic

There’s usually a good reason for why code has been LGTM’ed (approved and in the code base). If you don’t understand how it works, spend some time figuring it out. Log stuff, break stuff, look at some documentation of functions and patterns that were used.

![](/Users/benjaminschachter/Downloads/medium-export-53ea0a62798a34a070e02ba6c20fabcaa79f4d6071252b2620cbac428dd8bde9/posts/md_1652096354662/img/1__0aWphq93q6n__iagD06Yizg.jpeg)

Could you tell your rubber duck how it worked? If you’re still unsure, ask some questions about specific gaps in your understanding.

#### Get comfortable debugging, since you do it a lot

To debug is to understand the underlying problem in the functionality of your code and then solve the bug. You need to understand how the thing works to figure out why it’s not working in the first place. Being able to utilize the browser’s debugging tools is going to make your life and job way easier. The debugger and console methods are your friends.

Some helpful resource that I found:

- [CSS Tricks on Debugging](https://css-tricks.com/debugging-tips-tricks/)
- [Front-End Masters Debugging](https://frontendmasters.com/courses/debugging-javascript/) (It’s paid but pretty good)

_Pro-tip:_ console.log output can be stylized using CSS. This makes log you want to see easier to identify.

console.log('%c I want this to be big and red', 'font-size: 30px; color: red;');

![](/Users/benjaminschachter/Downloads/medium-export-53ea0a62798a34a070e02ba6c20fabcaa79f4d6071252b2620cbac428dd8bde9/posts/md_1652096354662/img/1__b2xJzCNke1kuLiSzmHyXGQ.png)

#### Follow the Data

This came up over and over again, because admittedly it was a mistake I kept making. It’s something I got better at, but still needs work.

A big portion of software development involves the manipulation of data into a format so that a user can get actionable insight from it or update it on their own.

Applications with a uni-directional data flow and a global state have a direct line of data to follow. All that data is coming from somewhere. Once you find out where it’s coming from it’s easier to debug.

#### Isolate your problems then integrate them into what you’re working on

[Codepen.io](http://codepen.io) is a close friend of mine, and it should be yours too. When I can’t figure out what’s causing the issue, I make a simple version of what I’m building. I make sure it works, and then integrate it into my development environment. It’s easier to figure out what might be breaking your UI in a stripped down environment.

#### Think about how the functionality should work

Writing down how something should work from a 30,000ft level and then from a technical level has helped me understand what I should be building, how I should be building it, and helps mitigate pit falls. If I can’t explain how the thing I’m building works (from a high and low level) I’m doing myself a disservice. Without a plan, I’m going to be doing a lot of wheel spinning in the very near future.

Additionally, I can refer back to what I wrote or show someone what I’m thinking which helps reduce miscommunication.

#### Embrace the struggle

After 10,000 hours of struggling at work, you’ll be way better at struggling through and solving problems. You’re going to have to do it regardless, so enjoying the experience is going to make your day-to-day much, much better. Laugh at yourself a bit and try to really break down the problem. You’ll get there, even if you need a little extra help.

### Take constructive criticism and constantly iterate on it

Your teammates want you to do better. Senior developers want to make you a stronger developer. Act on their advice even if you don’t initially understand why they’re telling you to do it. There’s never just one person who knows everything. Chat it up.

### Take your time

Rushing through your work causes back and forth, lots of confusion, and additional frustration. My boss would rather see better code later than bad code sooner. I mean, wouldn’t we all?

### Continue learning outside of work

As much as I learn on the job, I still want to continue to learn new things outside of just working on our code base. That might be picking up Python, building a bot, working through a video series, or working on a personal project. I made a board with Zenhub + Github to track where I’m at and what I’ve committed to for the month. Keeping a general goal for the month has forced me to continue learning, building, and yes, blogging on my own time.
