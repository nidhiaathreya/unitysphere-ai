import type { GlobalStats } from "@/types";
import { MOCK_GLOBAL_STATS } from "@/lib/constants";

export async function fetchGlobalStats(): Promise<GlobalStats> {
  try {
    const res = await fetch("/api/stats", { next: { revalidate: 60 } });
    if (res.ok) return res.json();
  } catch {
    // fallback
  }
  return MOCK_GLOBAL_STATS;
}

export async function fetchWeather(lat: number, lon: number) {
  const key = process.env.OPENWEATHER_API_KEY;
  if (!key) {
    return {
      temp: 28,
      description: "Partly cloudy",
      humidity: 65,
      wind: 12,
      demo: true,
    };
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  const data = await res.json();
  return {
    temp: data.main.temp,
    description: data.weather[0]?.description,
    humidity: data.main.humidity,
    wind: data.wind.speed,
    demo: false,
  };
}

export async function fetchNews(query = "global humanitarian crisis") {
  const key = process.env.NEWS_API_KEY;
  if (!key) {
    return [
      {
        title: "Global coalition launches climate resilience initiative",
        source: "UnitySphere Feed",
        publishedAt: new Date().toISOString(),
      },
      {
        title: "AI-powered disaster response saves thousands in flood zones",
        source: "UnitySphere Feed",
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ];
  }
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=5&apiKey=${key}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.articles || []).map(
    (a: { title: string; source: { name: string }; publishedAt: string }) => ({
      title: a.title,
      source: a.source.name,
      publishedAt: a.publishedAt,
    })
  );
}

export async function fetchDisasterAlerts() {
  // EONET NASA open API (no key required)
  try {
    const res = await fetch(
      "https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=10"
    );
    if (!res.ok) throw new Error("EONET failed");
    const data = await res.json();
    return (data.events || []).map(
      (e: {
        id: string;
        title: string;
        categories: { title: string }[];
        geometry: { coordinates: number[] }[];
      }) => ({
        id: e.id,
        title: e.title,
        category: e.categories[0]?.title || "Unknown",
        lat: e.geometry[0]?.coordinates[1] ?? 0,
        lng: e.geometry[0]?.coordinates[0] ?? 0,
      })
    );
  } catch {
    return [];
  }
}
