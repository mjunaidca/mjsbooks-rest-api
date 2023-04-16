import { NextRequest, NextResponse } from 'next/server'

import { verifyAuth } from './src/app/api/(middleAuth)/jwtClientIdTest/route';


async function fetchAccessToken() {
    const getAllTokens = await fetch('https://mjsbooks-rest-api.vercel.app/api/accessToken')
    const AllTokens = await getAllTokens.json()
    // return NextResponse.json(AllTokens)

    return AllTokens.map(({ access_token }: any) => access_token);
}

export async function middleware(request: NextRequest) {

    console.log('Middleware ran')
    const dbTokens = await fetchAccessToken();
    console.log('accessTokens ran', dbTokens)

    const authHeader = request.headers.get('Authorization');
    console.log('authHeader', authHeader)


    //browser verification
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new NextResponse('Unauthorizaed User', { status: 401 });
    }

    const accessToken = authHeader.slice(7);

    console.log('accessToken', accessToken)

    console.log('CHECK THE COMPARISION', !dbTokens.includes(accessToken))

    if (!dbTokens.includes(accessToken)) {
        return new NextResponse("Unable to verify kindly Register", { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/orders/:path*', '/api/accessToken', '/api/jwtClientIdTest']
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
