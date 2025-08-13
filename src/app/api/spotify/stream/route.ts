import { NextRequest, NextResponse } from "next/server";

let interval: NodeJS.Timeout;

export async function GET(req: NextRequest) {
  const encoder = new TextEncoder();

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    return NextResponse.json({ error: "Missing env variables" }, { status: 500 });
  }

  // Get access token
  const authParams = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: SPOTIFY_REFRESH_TOKEN,
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET,
  });

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: authParams.toString(),
  });

  if (!tokenRes.ok) {
    return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
  }

  const tokenData = await tokenRes.json();

  const stream = new ReadableStream({
    async start(controller) {
      async function sendNowPlaying() {
        const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });

        if(res.status === 204) {
          controller.enqueue(encoder.encode(`data: {isPlaying: false}}\n\n`));
        }

        const json = await res.json();

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(json)}\n\n`));
      }

      await sendNowPlaying();
      interval = setInterval(sendNowPlaying, 10_000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
    cancel() {
      clearInterval(interval);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
