# User Guide

Back to the main template guide: [README.md](./README.md)

Maintainer and extension notes: [MAINTANER.md](./MAINTANER.md)

## Purpose

This file explains how the website behaves from a visitor's point of view.

It is about:

- what users can click
- what visible controls do
- how navigation and contact features behave

It is not the right file for:

- template setup
- code architecture
- adding new article types
- changing the schema

For that, use [README.md](./README.md) and [MAINTANER.md](./MAINTANER.md).

## What This Guide Helps You Check

Use this file when you want to confirm that a customized copy of the template still behaves well for visitors.

It is especially useful for:

- manual QA after content changes
- checking navigation flow
- checking contact and resume behavior
- checking desktop vs mobile expectations

## What Kind Of Site This Is

This website is a single-page portfolio/resume site made of sections.

Users move through it by:

- opening sections from navigation
- switching categories
- interacting with cards, links, filters, modals, and forms

Depending on the device, the layout changes between desktop and mobile presentation.

## Navigation

### Section navigation

- clicking a section link opens that section
- on desktop, the main navigation appears in the sidebar
- on mobile, section links appear near the top of the current view

### Category navigation

- categories group sections into larger buckets such as `Home`, `History`, `Hobbys`, and `Contact`
- on mobile, category controls appear near the bottom of the interface
- when a category contains more than one section, the site remembers the last visited section in that category

### Deep links

- the site uses URL hash navigation
- opening a direct link to a section should land on that section
- refreshing the page should keep the current section route

## Profile Area

### Profile card

The profile area can show:

- avatar
- name
- rotating roles
- status indicator

### Rotating roles

- if more than one role is configured, the role text rotates automatically

### Status circle

- when visible, the status circle acts as a quick shortcut to the `contact` section
- its message explains the configured availability state

### Name pronunciation

- if a pronunciation audio file exists, the speaker control plays it
- if only pronunciation text exists, the UI can still explain how the name is pronounced

## Utility Tools

### Language picker

- shows the enabled languages from site settings
- switching language updates interface text and localized content immediately

### Theme picker

- switches between configured themes, usually dark and light
- theme changes affect colors and theme-aware UI styling

### Resume control

Depending on configuration, the resume control can offer:

- view resume
- download resume
- email resume

If no resume PDF is configured, the site should show an error notification instead of opening a broken link.

### Fullscreen toggle

- on supported browsers and layouts, the fullscreen button enters or exits fullscreen mode
- if the browser or layout does not support it well, the control may be absent

### Cursor mode toggle

On supported desktop layouts, the cursor tool can switch cursor behavior or theme presentation.

If the current fork/template keeps this feature:

- it is mainly a visual/interaction enhancement
- touch devices or unsupported environments may not activate it fully

## Content Interactions

### Category filters inside articles

- some article blocks show filter buttons such as `All`, `Tools`, `Web`, or other custom categories
- these filters only change the items inside that article
- they do not change the whole page or top-level navigation

### Project and media preview controls

Cards and items may expose preview actions such as:

- opening a website
- opening GitHub or docs links
- opening screenshots in a gallery modal
- opening a YouTube video modal

### External links

- external links may show a confirmation step before leaving the site
- this is meant to make it clear that the user is leaving the portfolio

### Copy-to-clipboard controls

- some contact items or handles can be copied directly
- after copying, the site should provide visible feedback

## Contact Section

### Contact links

The contact area may include direct links for:

- email
- phone
- LinkedIn
- WhatsApp
- Telegram
- Discord
- Instagram
- other configured platforms

Some contact entries may also support:

- copy actions
- Gmail compose links
- quick chat links
- QR-style or device-friendly phone actions

### Contact form

The contact form typically:

1. validates the fields
2. sends the message through the configured EmailJS integration
3. shows a success state if the send worked

Expected fields:

- name
- email
- subject
- message

### Resume email flow

If enabled, the site can also support a resume-by-email flow using the configured resume email settings.

## Modals And Feedback Layers

### Gallery modal

- used for screenshots, albums, and image previews

### YouTube modal

- used for project demos or embedded video content

### Confirmation dialog

- used before opening certain external destinations

### Notifications

- used for success, missing-file, or error feedback

### Loading indicators

- some actions can show a spinner or temporary loading state
- examples include sending messages and queued transitions

## What Visitors Should Expect

From a user perspective, the site should feel like:

- a smooth single-page portfolio
- section-driven rather than page-driven
- responsive on desktop and mobile
- content-rich but still navigable

## Quick QA Checklist

After customizing the template, a maintainer can use this checklist:

- section navigation opens the expected section
- category navigation stays understandable on mobile
- language switching updates visible text correctly
- theme switching works without broken contrast
- resume actions point to the correct file or CV page
- contact links open the correct destinations
- the contact form succeeds or fails gracefully
- project previews, galleries, and video modals still work
- external links show the expected confirmation behavior

## When This Guide Is Useful

Use this guide when you want to:

- understand the live UI behavior
- QA the visible features
- check whether a fork/template still behaves correctly after customization

If you want to change the content or extend the system, go back to:

- [README.md](./README.md)
- [MAINTANER.md](./MAINTANER.md)
