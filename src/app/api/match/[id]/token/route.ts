import { NextRequest, NextResponse } from "next/server";
import { api } from "@/utils/api";

export async function POST(req: NextRequest, { params }: {params: Promise<{ id: string }>}) {
  const matchId = (await params).id
  const baseUrl = process.env.BACKEND_MATCH_URL
  const url = baseUrl + "/public/match/" + matchId + "/token"

  
  const resp = await api(url, "POST")
  try {
  
    return NextResponse.json({ message: "success", data: resp.data }, { status: 200 });

  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
