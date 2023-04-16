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
        throw new Error('There are No Registered Clients')
    }


    return NextResponse.json(tokenClients)
}