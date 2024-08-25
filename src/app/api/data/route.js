// app/api/saveData/route.js
import {NextResponse, NextRequest} from "next/server";
var dataRec;
export function GET() {
  return NextResponse.json({dataRec});
  // dataRec = null;
}

// dataRec = null;
export async function POST(request) {
  const data = await request.json();
  dataRec = data;
  console.log(data); // This will log the received data to the server console
  return NextResponse.json({message: "Data received successfully!"});
}
