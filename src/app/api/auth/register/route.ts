import { NextRequest, NextResponse } from "next/server";

interface ICred {
  email: string;
  password: string;
  username: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password, username }: ICred = await request.json();
    console.log({ email, password, username });
  } catch (e) {
    console.error("Error parsing request:", e);
    return NextResponse.json({ message: "Error occurred" }, { status: 400 });
  }

  return NextResponse.json({ message: "Success" });
}
