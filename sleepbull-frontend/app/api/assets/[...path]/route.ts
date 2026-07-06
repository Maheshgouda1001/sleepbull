import { NextRequest, NextResponse } from "next/server";

const BACKEND_ORIGIN =
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_BASE ??
  "http://localhost:4000";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { path } = await context.params;
  const assetPath = path.join("/");

  if (
    !assetPath.startsWith("public/") &&
    !assetPath.startsWith("uploads/")
  ) {
    return NextResponse.json(
      { success: false, message: "Asset path not allowed" },
      { status: 400 }
    );
  }

  const targetUrl = `${BACKEND_ORIGIN.replace(/\/$/, "")}/${assetPath}${request.nextUrl.search}`;
  const response = await fetch(targetUrl, {
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json(
      { success: false, message: "Asset not found" },
      { status: response.status }
    );
  }

  return new NextResponse(response.body, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") ??
        "application/octet-stream",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
