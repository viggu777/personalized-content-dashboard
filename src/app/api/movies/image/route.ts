import { NextResponse, type NextRequest } from "next/server";

/**
 * Image proxy for TMDB posters.
 *
 * The browser requests `/api/movies/image?path=/abc.jpg`; this route fetches
 * the poster from image.tmdb.org server-side and streams it back from our own
 * domain. That way posters load even when a visitor's network can't reach
 * image.tmdb.org directly, and we avoid configuring remote image patterns.
 *
 * Only a TMDB poster path is accepted (host + size are fixed here), so this
 * cannot be used as an open proxy / SSRF vector.
 */

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const VALID_PATH = /^\/[\w/-]+\.(jpe?g|png|webp)$/i;

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path");

  if (!path || path.includes("..") || !VALID_PATH.test(path)) {
    return NextResponse.json({ message: "Invalid image path." }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${IMAGE_BASE}${path}`, { cache: "no-store" });
    if (!upstream.ok || !upstream.body) {
      return NextResponse.json(
        { message: "Image not found." },
        { status: upstream.status || 502 },
      );
    }

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
        "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
      },
    });
  } catch {
    return NextResponse.json({ message: "Failed to load image." }, { status: 502 });
  }
}
