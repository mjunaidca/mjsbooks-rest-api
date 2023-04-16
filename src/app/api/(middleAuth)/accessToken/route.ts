import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {

    const conn = postgres({
        ssl: require,
    });


    const tokenClients = await conn.unsafe
        (`SELECT access_token from clients`)

    if (!tokenClients) {
        throw new Error('Invalidet Clients Registration!')
    }

    return NextResponse.json(tokenClients)
}