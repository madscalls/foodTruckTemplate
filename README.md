# Flip Side: food truck website template

A food truck template by Whelk Works, built with React + Vite. It has a colorful one-page home and a separate About page.

- **Home** (`/`): hero with today's stop, the menu (burgers and fries), "Find the truck" schedule calendar, photo band and a catering request form.
- **About** (`/about`): the story, "What we won't skip", the crew and a catering call to action.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Make it a client's

- **Name, contact, menu, crew, sample schedule:** `src/site.js`
- **Colors and fonts:** the top of `src/styles.css`. `--ink` is the dark anchor color: navy by default, with espresso and charcoal listed as alternatives.
- **Photos:** `public/images/`. Keep the file names or update them in `src/pages/`.
- **Copy:** anything in `[brackets]` is a placeholder.

## Schedule: Google Calendar

The schedule reads the truck's Google Calendar through the Calendar API (`src/calendar.js`). Until it's set up, it shows the sample stops from `site.js`, dated from today.

1. Make the truck's calendar public (Settings › Access permissions).
2. In Google Cloud, enable the Google Calendar API and create an API key. Restrict it to that API and to the site's domain.
3. Copy `.env.example` to `.env.local` and fill in `VITE_GCAL_ID` (the calendar ID from its settings) and `VITE_GCAL_KEY`.

Each event's title, location and time become a stop. The owner only has to add events to their calendar.

## Catering form

Set `VITE_FORM_ENDPOINT` to a form service such as Formspree or Basin, and requests will arrive by email. Without it, the form only shows its thank-you message, which is handy for demos.

## Deploy

On Cloudflare Pages, use build command `npm run build` and output folder `dist`. `public/_redirects` sends `/about` to the app. Add the `VITE_*` variables under the project's environment variables.

## Before launch

- **Photos:** the sample burger-stack photo carries Unsplash+ watermarks, and the yellow truck photo shows another business's branding. Replace both with the client's own photos.
