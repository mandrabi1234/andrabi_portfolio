---
title: Bat/Bowl Index & Cricket Analytics Platform
organization: Pakistan Cricket Board
role: Analytics Consultant
period: 2024 – Present
category: professional
order: 1
summary: A batting and bowling ranking model used by the Pakistan Cricket Board's national selection committee for central contracts and team selection, served to external consumers through a versioned REST API.
highlights:
  - Ranks players across T20, ODI and four-day cricket with 45+ tunable weights
  - Versioned, key-authenticated REST API with interactive OpenAPI docs
  - Daily automated data refresh via GitHub Actions
tech: [Python, Pandas, REST API, OpenAPI, GitHub Actions, Streamlit]
images: []
# images:
#   - src: /projects/pcb-bat-bowl-index/rankings.png
#     caption: Rankings output for a single season
---

## Overview

The Bat/Bowl Index is the player ranking system behind the Pakistan Cricket Board's selection work.
The national selection committee uses it when awarding central contracts and picking national
squads. It scores every batter and bowler in the domestic system across T20, ODI and four-day
cricket, and is exposed to external consumers through a REST API so other tools can build on
the same rankings.

## The problem

Raw averages and aggregates treat every run and wicket the same. A fifty against a strong attack
in a national final and a fifty against weak opposition in a district game look identical, and
selectors had no consistent way to compare players across competitions, formats and seasons.

## What I built

**The ranking model.** Each innings is converted into a weighted run value (batting) or wicket
value (bowling). The weights account for strike rate, economy rate, batting and bowling averages,
batting position, the quality of the opposition, which batter was dismissed, and the strength of
the tournament. Values are clipped at configurable percentiles to limit outliers, then combined
into a single score and scaled to 0–100. All 45+ weights are tunable per request, so analysts can
test alternative weighting schemes without code changes.

**The API.** The model is served as a versioned, key-authenticated REST API with interactive
OpenAPI documentation. Consumers can:

- Rank by format, or combine formats into one ranking
- Filter by season, competition level (national, regional, district), tournament, draw, round or team
- List valid filter values through discovery endpoints, so pickers in a UI stay in sync with the data
- Run the model on their own uploaded dataset
- Export results as CSV, and review usage analytics

**The data pipeline.** A scheduled GitHub Actions workflow refreshes the dataset every day. It
re-pulls any tournament with recent activity from the source match database, replaces those rows
so corrected scorecards come through, deduplicates to one row per player per innings, and
republishes data across all seasons.

**Caching.** Responses carry ETags and are cached server-side. The cache key includes a version
stamp of the data files, so the daily refresh invalidates stale results automatically and
repeat queries still return instantly.

## Impact

Used by the national selection committee for central contract and team selection decisions.

<!-- Add: number of players and seasons covered, number of API consumers, anything you can share. -->
