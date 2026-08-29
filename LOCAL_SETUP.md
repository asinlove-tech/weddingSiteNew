# Local Setup

This project is frontend-only and fully static.

## Install and run

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm start
```

## Build

```bash
npm run build
```

Deploy the generated `frontend/build` folder to any static host.

## RSVP WhatsApp number

Edit `frontend/src/config.js` and replace `919999999999` with your actual WhatsApp number in international format.
