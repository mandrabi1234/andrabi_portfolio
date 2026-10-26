---
# Copy this file, rename it (the filename becomes the URL: my-project.md -> /projects/my-project),
# and fill it in. Files starting with "_" are ignored.

title: Project Name
organization: Company or client        # optional
role: Your role                        # optional
period: 2026                           # optional
category: professional                 # professional | personal
order: 10                              # lower shows first within its category
summary: One or two sentences shown on the home page card.
highlights:                            # short bullets for the card and the top of the page
  - What you built
  - The result
tech: [Python, React.js]
links:                                 # optional
  - label: Live site
    url: https://example.com
cover: /projects/my-project/cover.png  # optional; image shown on the card and page header
images:                                # screenshot gallery; put files in public/projects/my-project/
  - src: /projects/my-project/screen-1.png
    caption: What this screenshot shows
draft: true                            # true hides it until you're ready
---

## Overview

What the project is and who it's for.

## The problem

What was hard or broken before.

## What I built

Architecture, key decisions, interesting technical details. You can also drop an image
anywhere in the text:

![Diagram of the pipeline](/projects/my-project/architecture.png)

## Impact

Numbers, adoption, what changed.
