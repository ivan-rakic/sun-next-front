import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const expectedSecret = process.env.NEXT_REVALIDATE_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { error: "Revalidation is not configured" },
      { status: 500 },
    );
  }

  const url = new URL(request.url);
  const revalidateHeader = request.headers.get("x-revalidate-secret");
  const authorization = request.headers.get("authorization");
  const providedSecret =
    revalidateHeader ??
    authorization?.replace(/^Bearer\s+/i, "") ??
    url.searchParams.get("secret");

  if (!providedSecret || providedSecret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const path = url.searchParams.get("path");
  if (
    path &&
    (!path.startsWith("/") || path.startsWith("//") || /[?#]/.test(path))
  ) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  if (path) {
    revalidatePath(path);
  } else {
    revalidatePath("/", "layout");
  }
  revalidatePath("/sitemap.xml");
  revalidatePath("/robots.txt");

  return NextResponse.json({
    revalidated: true,
    paths: [path ?? "/", "/sitemap.xml", "/robots.txt"],
  });
}
