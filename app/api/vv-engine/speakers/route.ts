// app/api/vv-engine/speakers/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://127.0.0.1:50021/speakers");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("vv-engine API error:", err);
    return NextResponse.json({ error: "Failed to fetch speakers" }, { status: 500 });
  }
}