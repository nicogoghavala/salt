repo: nicogoghavala/salt
branch: main

## Last sync

date: 2026-08-31T15:47:11Z

### Updated in this project

- Read the repo's Next.js app as source material; did not import it.
- The Salt Guide front end here is a new, separate static build.
- Confirmed `public/` holds only a README — the road book PDF and KML the
  Journeys page links to were never committed.

## Screen map

| Screen in this project | Built from |
| --- | --- |
| Home-Loud.dc.html | New design. Structure informed by `app/page.tsx` (Home, FEATURED) |
| Browse-Loud.dc.html | New design. Data shape from `app/page.tsx` (Place, FOOD_TIERS, STAY) |
| Property-Loud.dc.html | New design. Drawer content model from `app/page.tsx` (PlaceDrawer) |
| Booking-Loud.dc.html | New — no equivalent in the repo |
| Places-Loud.dc.html | New design. Replaces `app/page.tsx` (CityView, SECTIONS) |
| Guide-Loud.dc.html | New design. Categories from `app/page.tsx` (FOOD, DRINK, LOCAL) |
| Concierge-Loud.dc.html | New design. Replaces `app/page.tsx` (ConciergePage) |
| Journeys.html | Route data from `app/page.tsx` (ROAD_BOOKS, rb001 stops) |
