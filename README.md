# Amit & Sakthi Wedding Website

A fully static React wedding website. No backend, database, API server, or environment variables are required.

## Run locally

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

## Production build

```bash
cd frontend
npm run build
```

The static production files are generated in `frontend/build/` and can be deployed to a static hosting provider.

## RSVP

The RSVP button opens WhatsApp with a prefilled message. Update the phone number in `frontend/src/config.js` before deployment:

```text
https://wa.me/919999999999
```

Use the full international number without `+`, spaces, or punctuation.
