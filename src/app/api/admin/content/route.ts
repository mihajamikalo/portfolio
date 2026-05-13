import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getPortfolioContent, savePortfolioContent } from "@/lib/content";
import type { PortfolioContent } from "@/types/content";

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const content = await getPortfolioContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = (await request.json()) as PortfolioContent;
    await savePortfolioContent(payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Invalid content format." }, { status: 400 });
  }
}
