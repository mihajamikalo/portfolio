import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const resumePath = path.join(process.cwd(), "public", "CV_Tiavina_Liantsoa.pdf");
  const fileBuffer = await readFile(resumePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="CV_Tiavina_Liantsoa.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
