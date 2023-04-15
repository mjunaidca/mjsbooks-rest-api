import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {
    const conn = postgres({
        ssl: require,
    });
    const result = await conn.unsafe("SELECT * FROM books");
    console.log(result);

    if (!result) {
        return NextResponse.json({ "status": 'Not Found' })
    }



    return NextResponse.json({ "status": 'ok' })
}