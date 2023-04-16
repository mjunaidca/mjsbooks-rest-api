import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import { jwtVerify } from "jose";

const secretKey = 'DbxHHxIAVxgl3dVzut6pmPFUPCIre5FcuEa828VVMqw'; // Replace this with your secret key

export async function VerifyToken(accessToken: string) {
    let clientId;
    try {
        clientId = await jwtVerify(accessToken, Buffer.from(secretKey));
        if (typeof clientId === 'object' && 'id' in clientId) {
            return clientId.id;
        }
    } catch (error) {
        console.error(error);
        throw new Error("Invalid access token.");
    }
    return clientId.payload.id;
}

export async function GET(request: NextRequest) {

    const conn = postgres({
        ssl: require,
    });


    const tokenClients = await conn.unsafe
        (`SELECT id from clients`)

    if (!tokenClients) {
        throw new Error('There are No Registered Clients')
    }


    return NextResponse.json(tokenClients)
    // return tokenClients.map(({ id }: any) => id);
}