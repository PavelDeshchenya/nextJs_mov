import { NextResponse } from "next/server";

export default async function POST(request: Request) {
  try {
    const { email, password, username } = await request.json();
    console.log({ email, password, username });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "Success" });
}
