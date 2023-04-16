import { NextRequest, NextResponse } from 'next/server'


async function fetchClientIds() {
    const getids = await fetch('http://localhost:3000/api/verifyClientId')
    const clientIds = await getids.json()

    return clientIds.map(({ id }: any) => id);
}

export async function middleware(request: NextRequest) {

    console.log('Middleware ran')

    // // Fetch client IDs from the database
    const dbClientIds = await fetchClientIds();
    console.log('Call For Client Ids', dbClientIds)

    const authHeader = request.headers.get('Authorization');

    // Verify that the Authorization header is present and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new NextResponse('Unauthorizaed User', { status: 401 });
    }

    const accessToken = authHeader.slice(7);
    console.log('accessToken', accessToken)




    // Call the next middleware or route handler
    return NextResponse.next();
}

// export const config = {
//     matcher: ['/api/orders/:path*', '/api/accessToken']
// }


// async function fetchAccessToken() {
//     const getAllTokens = await fetch('https://mjsbooks-rest-api.vercel.app/api/accessToken')
//     const AllTokens = await getAllTokens.json()
//     // return NextResponse.json(AllTokens)

//     return AllTokens.map(({ access_token }: any) => access_token);
// }

// export async function middleware(request: NextRequest) {

//     console.log('Middleware ran')
//     const dbTokens = await fetchAccessToken();
//     console.log('accessTokens ran', dbTokens)

//     const authHeader = request.headers.get('Authorization');
//     console.log('authHeader', authHeader)


//     //browser verification
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return new NextResponse('Unauthorizaed User', { status: 401 });
//     }

//     const accessToken = authHeader.slice(7);

//     console.log('accessToken', accessToken)

//     console.log('CHECK THE COMPARISION', !dbTokens.includes(accessToken))

//     if (!dbTokens.includes(accessToken)) {
//         return new NextResponse("Unable to verify kindly Register", { status: 401 });
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/api/orders/:path*', '/api/accessToken']
// }