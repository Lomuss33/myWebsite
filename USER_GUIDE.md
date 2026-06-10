# User Guide

Project overview: [README.md](./README.md)  
Maintenance and extension notes: [MAINTANER.md](./MAINTANER.md)

## Purpose

This guide describes the visible behavior of the site from a visitor's point of view.

Use it for:

- understanding what users can interact with
- checking whether navigation still behaves correctly
- verifying contact and resume features
- manual QA after content or UI changes

## Site Model

The site is a single-page portfolio/resume experience built from sections.

Visitors move through it by:

- opening sections from navigation
- switching categories
- interacting with cards, links, filters, modals, and forms

The layout changes between desktop and mobile presentations.

## Navigation

### Section navigation

- clicking a section link opens that section
- on desktop, primary navigation appears in the sidebar
- on mobile, section links appear near the top of the current view

### Category navigation

- categories group sections into larger buckets such as `Home`, `History`, `Hobbys`, and `Contact`
- on mobile, category controls appear near the bottom of the interface
- when a category contains more than one section, the site remembers the last visited section in that category

### Deep links

- the site uses URL hash navigation
- opening a direct link to a section should land on that section
- refreshing the page should preserve the current section route

## Profile Area

The profile area can include:

- avatar
- name
- rotating roles
- status indicator
- pronunciation audio or pronunciation text

Behavior notes:

- if more than one role is configured, the role text rotates automatically
- when visible, the status circle acts as a shortcut to the `contact` section
- if pronunciation audio exists, the speaker control should play it

## Utility Controls

### Language picker

- shows enabled languages from site settings
- switching language updates UI strings and localized content immediately

### Theme picker

- switches between configured themes, usually dark and light
- theme changes affect colors and theme-aware styling

### Resume control

Depending on configuration, the resume control can offer:

- view resume
- download resume
- email resume

If no resume PDF is configured, the site should show an error notification instead of opening a broken link.

### Fullscreen toggle

- on supported browsers and layouts, the fullscreen button enters or exits fullscreen mode
- the control may be absent where support is weak or intentionally disabled

### Cursor mode toggle

- on supported desktop layouts, the cursor tool can switch cursor behavior or visual mode
- on touch devices or unsupported environments, this feature may be limited or absent

## Content Interactions

### Filters inside articles

- some article blocks show filter buttons such as `All`, `Tools`, `Web`, or other custom categories
- these filters only change the items inside that article
- they do not change the entire page or top-level navigation

### Project and media preview actions

Cards and items may expose actions such as:

- opening a website
- opening GitHub or documentation links
- opening screenshots in a gallery modal
- opening a YouTube video modal

### External links

- some external links may show a confirmation step before leaving the site
- the purpose is to make the destination explicit before redirecting the user

### Copy-to-clipboard actions

- some contact items or handles can be copied directly
- the site should provide visible confirmation after copying

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
- QR-style or phone-friendly call actions

### Contact form

The contact form typically:

1. validates the fields
2. sends the message through EmailJS
3. shows either success feedback or an error state

Expected fields:

- name
- email
- subject
- message

### Resume email flow

If enabled, the site can also send resume links through the configured resume email flow.

## Modals and Feedback

### Gallery modal

- used for screenshots, albums, and image previews

### YouTube modal

- used for demos or embedded video content

### Confirmation dialog

- used before opening certain external destinations

### Notifications

- used for success, missing-file, and error feedback

### Loading indicators

- some actions show a spinner or temporary loading state
- common examples are sending messages and waiting for transitions

## Visitor Expectations

From a user perspective, the site should feel:

- section-driven rather than page-driven
- responsive on desktop and mobile
- content-rich but still easy to navigate
- visually polished without blocking core interactions

## QA Checklist

After content or UI changes, verify:

- section navigation opens the expected section
- category navigation remains understandable on mobile
- language switching updates visible text correctly
- theme switching works without broken contrast
- resume actions point to the correct file or CV page
- contact links open the correct destinations
- the contact form succeeds or fails gracefully
- project previews, galleries, and video modals still work
- external link confirmations behave as expected

## When To Use This Guide

Use this guide when you want to:

- understand live UI behavior
- run manual QA on visible features
- confirm that a customized copy still behaves correctly for visitors
