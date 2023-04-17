import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {

    console.log('CALLED ACCESS TOKEN ran');

    const conn = postgres({
        ssl: require,
    });

    const ClientsId = await conn.unsafe
        (`SELECT id FROM clients`)

    if (!ClientsId) {
        throw new Error('There are No Registered Clients')
    }

    const ExtractClientIds = ClientsId;

    const ArrayclientIds: string[] = ExtractClientIds.map(({ id }: any) => id);

    return NextResponse.json(ArrayclientIds); // Use NextResponse.json() to return JSON data
}

