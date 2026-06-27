import { NextRequest, NextResponse } from "next/server";

const BACKEND_ORIGIN =
  process.env.BACKEND_URL ??
  process.env.NEXT_PUBLIC_API_BASE ??
  "http://localhost:4000";

async function proxyRequest(
  request: NextRequest,
  pathSegments: string[]
) {
  const path = pathSegments.join("/");
  const search = request.nextUrl.search;
  const targetUrl = `${BACKEND_ORIGIN}/api/${path}${search}`;

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "application/json");

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: "no-store",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.text();
  }

  const backendResponse = await fetch(targetUrl, init);
  const body = await backendResponse.text();

  return new NextResponse(body, {
    status: backendResponse.status,
    headers: {
      "Content-Type":
        backendResponse.headers.get("Content-Type") ?? "application/json",
    },
  });
}

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const { path } = await context.params;
  return proxyRequest(request, path);
}
