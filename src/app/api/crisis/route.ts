import { NextResponse } from "next/server";
import { MOCK_CRISIS_ALERTS } from "@/lib/mock-data";
import { fetchDisasterAlerts } from "@/lib/api/external";

export async function GET() {
  const nasaEvents = await fetchDisasterAlerts();
  const crises = [...MOCK_CRISIS_ALERTS];

  for (const event of nasaEvents.slice(0, 3)) {
    crises.push({
      id: `nasa-${event.id}`,
      type: "wildfire",
      severity: "medium",
      region: event.title,
      country: "Global",
      lat: event.lat,
      lng: event.lng,
      description: `${event.category}: ${event.title}`,
      detectedAt: new Date().toISOString(),
      organizationsNotified: Math.floor(Math.random() * 30) + 5,
    });
  }

  return NextResponse.json({ crises, count: crises.length });
}
