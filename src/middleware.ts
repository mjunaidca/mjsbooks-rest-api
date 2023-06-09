import { NextRequest, NextResponse } from 'next/server'

import { verifyAuth } from './app/lib/verifyAuth';


async function fetchClientIds() {
    const getClientIds = await fetch('https://mjsbooks-rest-api.vercel.app/api/jwtClientIdTest');

    if (!getClientIds.ok) {
        console.error('Error fetching client IDs:', getClientIds.statusText);
        return [];
    }

    const jsonData = await getClientIds.json();
    return jsonData;
}

// Function to check if a given JWT token is authorized
function isAuthorized(jetTokenId: string, dbClientIds: string[]): boolean {
    return dbClientIds.some(clientId => clientId === jetTokenId);
}

export async function middleware(request: NextRequest) {

    console.log('Middleware ran')
    const dbClientIds = await fetchClientIds();
    console.log('accessTokens ran', dbClientIds)

    const authHeader = request.headers.get('Authorization');
    // console.log('authHeader', authHeader)

    // browser verification
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ message: 'Unauthorizaed User' }, { status: 401 });
    }

    const accessToken = authHeader.slice(7);
    // const accessToken = authHeader.slice(7);

    const jetToken = await verifyAuth(accessToken)
    // const jetToken = await verifyAuth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM0NTJmMzEwLTcxYWYtNDUzZC04YTg1LWNkZTIwZjlmNDY0MiIsImlhdCI6MTY4MTY4Nzg0MiwiZXhwIjoxNjgyMjkyNjQyfQ.gJHj9poJfCLTih2qh_TbgW4yrL3poPA4kZsRbWTmHPU')
    console.log('jetToken', jetToken)

    // Check if the id in jetToken matches any of the dbClientIds

    const authorized = Array.isArray(dbClientIds) && isAuthorized(jetToken.id, dbClientIds);
    // const authorized = isAuthorized(jetToken.id, dbClientIds);

    // If authorized, proceed with the request
    if (authorized) {
        return NextResponse.next();
    }

    // If not authorized, return a 401 Unauthorized response
    return NextResponse.json({ message: 'Unauthorized User' }, { status: 401 });
}

export const config = {
    matcher: ['/api/orders/:path*', '/api/jwtClientIdTest']
}



















// async function fetchClientIds() {
//     const getids = await fetch('http://localhost:3000/api/verifyClientId')
//     const clientIds = await getids.json()
//     return clientIds;
// }

// export async function middleware(request: NextRequest) {

//     console.log('Middleware ran')

//     const authHeader = request.headers.get('Authorization');

//     // Verify that the Authorization header is present and starts with "Bearer "
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return new NextResponse('Unauthorizaed User', { status: 401 });
//     }

//     const token = authHeader.slice(7);
//     console.log('accessToken', token)

//     const verifiedToken =
//         token &&
//         (await verifyAuth(token).catch((err) => {
//             console.log(err);
//             return null;
//         }))

//     console.log('VERIFIED TOKEN', verifiedToken)

//     if (request.nextUrl.pathname.startsWith(`/api/verifyClientId`)) {
//         return NextResponse.redirect(new URL('/api/status', request.url))
//     }


//     if (!verifiedToken) {
//         return NextResponse.redirect(new URL('/api/api-clients/', request.url))

//     }




//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/api/orders/:path*', '/api/verifyClientId']
// }
