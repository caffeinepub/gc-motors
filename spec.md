# GC Motors

## Current State
GC Motors is a car game website with hero, car brands, features, media, partnership, coming soon, and about sections. The hero section has a "PLAY DEMO" button. Backend stores car brands, features, release date, and partner info.

## Requested Changes (Diff)

### Add
- Reviews section: users can submit a name, star rating (1-5), and text review. Reviews are stored in the backend and displayed on the page.
- Backend: `submitReview` (update call) and `getReviews` (query) functions.

### Modify
- Hero "PLAY DEMO" button: rename to "BUY YOUR CAR" and link to https://www.tile.dev/web-preview.html?id=b1d751d1-ba53-434d-80ee-2fa4f3c163f2 (opens in new tab).

### Remove
- Nothing removed.

## Implementation Plan
1. Update backend main.mo to add Review type, submitReview, and getReviews.
2. Create ReviewsSection.tsx component with a form (name, rating, review text) and display of existing reviews.
3. Update App.tsx to include ReviewsSection between PartnershipSection and ComingSoonSection.
4. Update HeroSection.tsx to change "PLAY DEMO" to "BUY YOUR CAR" with the new URL.
