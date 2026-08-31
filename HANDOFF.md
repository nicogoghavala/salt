# The Salt Guide — developer handoff

Static front end, no build step. Nine HTML pages, no dependencies beyond two CDN
fonts and (on Journeys) Leaflet. Open any file directly in a browser.

## Pages

| File | What it is | Interactive |
| --- | --- | --- |
| `index.html` | Redirect to the home page | — |
| `Home-Loud.dc.html` | Front door | — |
| `Browse-Loud.dc.html` | The 14 houses | Filters (place, type, sleeps, booking model), sort, clear |
| `Property-Loud.dc.html` | One house — Casa Palmeira as the worked example | Gallery, nights/guests steppers, live total |
| `Booking-Loud.dc.html` | Four-step booking | Steps, cook add-on, deposit/balance split |
| `Places-Loud.dc.html` | Goa / Alibag / Bombay / Kerala | Place switcher, per-place category tabs |
| `Guide-Loud.dc.html` | Eat & drink, To do, Adventure, Shop | Category × place filters |
| `Concierge-Loud.dc.html` | Enquiry for the 8 by-request houses | Intent, house, party size, sent state |
| `Journeys.html` | Road books, No. 001 plotted on a Leaflet map | Book switcher, click-to-fly stops |

Journeys is plain HTML rather than a design component on purpose: the map
container has to exist before Leaflet initialises.

## Data model

All data is currently hard-coded at the top of each page's logic class. It needs
to come from an API. Minimum shape:

### Property
```
id, name, slug
place            "Goa" | "Alibag" | "Bombay" | "Kerala"
locality         "Assagao"
type             "Villa" | "Apartment" | "Hotel" | "Plantation house"
sleeps           int
bedrooms, bathrooms
minNights        int
bookingMode      "instant" | "request"
ratePerNight     int (paise or rupees — pick one and be consistent)
cleaningFee      int
extras[]         { id, label, perNight }        e.g. the cook, 3500
photos[]         { url, caption }               order matters, [0] is the hero
whyWeChoseIt     string (2–3 paragraphs)
houseNotes[]     { label, body }                courtyard, verandah, pool…
nearby[]         { guideEntryId, driveMinutes }
```

### Guide entry
```
id, name, place, locality
category         "Eat & drink" | "To do" | "Adventure" | "Shop"
meta             "6 min drive"
when             "Lunch only"
tip              "Book before you fly"
note             string
photo            url
published        bool      — some addresses stay unpublished on purpose
```

### Booking
```
id, reference            "SG-2611-0148"
propertyId, arrive, leave, nights, guests
extras[]
subtotal, cleaning, extrasTotal, tax, total
depositAmount            30% of total
balanceAmount            70% of total
balanceDueOn             arrive − 14 days
status                   "held" | "confirmed" | "balance_due" | "paid" | "cancelled"
guest                    { name, email, phone, notes }
razorpay                 { orderId, paymentId, tokenId }
```

### Enquiry
```
id, reference "SG-ENQ-4471"
intent        "house" | "week" | "drive" | "group"
propertyId?, roughDates, roughNights, party
guest         { name, email, notes }
status        "new" | "replied" | "converted" | "closed"
```

## Availability — the actual hard part

Payments are the easy half. Two people must not be able to book the same house
for overlapping nights.

- Store availability as date ranges per property, not booleans.
- On "Reserve", take a short-lived hold (10–15 min) before sending the guest to
  Razorpay; release it if payment doesn't complete.
- Confirm the block only on the payment webhook, never on the browser redirect —
  the guest can close the tab.
- Owner-held (by-request) houses need a manual block too, because their calendar
  lives in someone's head. An admin view that lets you block dates is the
  minimum viable version.

## Payments — Razorpay

Chosen for an India-registered entity: 0% on UPI under ₹2,000, ~2% + GST on
domestic cards, 3% on international cards with no forex markup, full RBI PA-CB
licence, automatic eFIRC. (Stripe India is 4.3% + 2% conversion + GST, and its
UPI support is thin — UPI is how most Indian guests will want to pay.)

### Deposit + balance

1. **Deposit, 30%.** Create a Razorpay order for the deposit. On the payment
   webhook, confirm the booking and block the dates. Save the payment token —
   this is what lets you take the balance later.
2. **Balance, 70%,** charged automatically 14 days before arrival against the
   saved token. Email the guest the day before you take it. If the charge fails,
   retry and notify; the design promises a warning, not a surprise.
3. **Cancellation.** Free until the balance date (arrival − 14 days) — refund the
   deposit in full. After that the deposit is held and the balance is not taken.
   The cancellation date must be computed from the arrival date, never stored as
   a string.

### Integration points in the current code

| Where | What needs wiring |
| --- | --- |
| `Property-Loud.dc.html` → "Reserve these nights" | Currently navigates to the booking page. Should create a hold. |
| `Booking-Loud.dc.html` step 3 → "Pay … and confirm" | Replace the fake card fields with Razorpay Checkout. Never take card details in your own DOM. |
| `Booking-Loud.dc.html` step 4 | Reference number is hard-coded. Comes from the API. |
| `Concierge-Loud.dc.html` → "Send it" | POST the enquiry; email you; auto-reply the guest. |
| Everywhere | Prices, dates and totals are computed client-side for the prototype. The server must recompute and be the authority. |

## Known gaps

- **Photography** is placeholder — the Cloudinary URLs are the client's earlier
  Marseille set, standing in until the real shoot. The whole design leans on
  these being excellent.
- **Copy** — house names, notes, prices and all guide entries are written to the
  right shape but are not real.
- **Road book downloads** on Journeys point at
  `SALT_Road_Book_No_001_with_map.pdf` and `SALT_Road_Book_No_001_Enhanced.kml`,
  which don't exist yet. Add them to the site root.
- **Road books 002 and 003** are placeholders until the routes are driven.
- **Only one property page exists.** It needs to become a template driven by a
  slug, and Browse needs to link to the right one.
- **No account area.** Guests can't see a booking after paying or settle the
  balance early. Decide whether that's needed before launch.

## Design notes worth keeping

- Ground `#0f0e0d`, text `#f2efe8`, lime `#c8f052`, pink `#ff3d8b`, panels
  `#171514`, rules `#2a2724`.
- Display type: Bricolage Grotesque 800, tight tracking, uppercase. Body and all
  interface labels: IBM Plex Mono.
- Lime means instant-book and primary action. Pink means by-request and the
  road books. Don't mix them.
- Photographs run full bleed with no frames or filters. The dark ground exists so
  the images are the only light on the page.
