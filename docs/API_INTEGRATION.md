# API Integration Guide

## OpenAI (Unity AI Assistant)
```env
OPENAI_API_KEY=sk-...
```
Used in `/api/ai/chat` for live conversational responses. Falls back to demo responses without key.

## Google Gemini (Alternative)
```env
GEMINI_API_KEY=...
```
Extend `src/lib/ai/unity-ai.ts` to call Gemini API as fallback.

## HuggingFace
```env
HUGGINGFACE_API_KEY=hf_...
```
Use for embedding models in production matching:
- Model: `sentence-transformers/all-MiniLM-L6-v2`
- Replace `generateEmbedding()` in `src/lib/ai/matching.ts`

## NewsAPI
```env
NEWS_API_KEY=...
```
Global news feed for crisis detection context. Used in `src/lib/api/external.ts`.

## OpenWeather
```env
OPENWEATHER_API_KEY=...
```
Weather layer on global map. Endpoint: `api.openweathermap.org/data/2.5/weather`

## Google Maps
```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
```
Enables embedded map on `/map`. Enable Maps Embed API in Google Cloud Console.

## NASA EONET (No key required)
Disaster events auto-fetched in `/api/crisis` from:
`https://eonet.gsfc.nasa.gov/api/v3/events`

## WHO / UN Open Data
Add custom fetchers in `src/lib/api/external.ts`:
- WHO GHO API: `https://ghoapi.azureedge.net/api/`
- UN Data: `https://data.un.org/`

## Firebase Cloud Messaging
Configure in Firebase Console → Cloud Messaging.
Add service worker at `public/firebase-messaging-sw.js` for push notifications.

## Adding a New API
1. Add env var to `.env.example`
2. Create fetcher in `src/lib/api/external.ts`
3. Add API route in `src/app/api/` if server-side key needed
4. Never expose secret keys with `NEXT_PUBLIC_` prefix
