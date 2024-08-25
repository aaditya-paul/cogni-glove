import {NextResponse} from "next/server";

export function GET() {
  return NextResponse.json({message: "This is data route!"});
}

export function POST() {
  return NextResponse.json({message: "This is data route!"});
}
