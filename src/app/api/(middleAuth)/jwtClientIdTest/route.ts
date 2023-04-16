import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import { jwtVerify, SignJWT } from "jose";

export const runtime = 'experimental-edge';

interface UserJwtPayload {
    jti: string;
    iat: number;
    // id?: any
}

const secretKey = 'DbxHHxIAVxgl3dVzut6pmPFUPCIre5FcuEa828VVMqw'; // Replace this with your secret key

export const getJwTSecretKey = () => {
    const secret = secretKey;

    if (!secret || secret.length === 0) {
        throw new Error("JWT_SECRET is not defined");
    }

    return secret;
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwTSecretKey()));
        return verified.payload as UserJwtPayload;
    } catch (error) {
        throw new Error("Your token has expired.");
    }
}

// export async function GET(request: NextRequest) {

//     const conn = postgres({
//         ssl: require,
//     });


//     const tokenClients = await conn.unsafe
//         (`SELECT id from clients`)

//     if (!tokenClients) {
//         throw new Error('There are No Registered Clients')
//     }

//     const clientIds = await tokenClients;

//     const ArrayclientIds: string[] = clientIds.map(({ id }: any) => id);

//     return NextResponse.json(ArrayclientIds); // Use NextResponse.json() to return JSON data
// }


// export const VerifyAuth = async (token: string) {
//     let clientId;
//     try {
//         clientId = await jwtVerify(accessToken, Buffer.from(secretKey));
//         if (typeof clientId === 'object' && 'id' in clientId) {
//             return clientId.id;
//         }
//     } catch (error) {
//         console.error(error);
//         throw new Error("Invalid access token.");
//     }
//     return clientId.payload.id;
// }
