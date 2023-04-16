import { NextRequest, NextResponse } from 'next/server'

async function fetchAccessToken() {
    const getAllTokens = await fetch('https://mjsbooks-rest-api.vercel.app/api/accessToken', {
        cache: 'no-store'
    })
    const AllTokens = await getAllTokens.json()
    // return NextResponse.json(AllTokens)

    return AllTokens.map(({ access_token }: any) => access_token);

}

export async function middleware(request: Request) {

    console.log('Middleware ran')
    const dbTokens = await fetchAccessToken();
    console.log('accessTokens ran', dbTokens)

    const authHeader = request.headers.get('Authorization');
    console.log('authHeader', authHeader)

    //browser verification
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new NextResponse('Register Or Login To Access The Route', { status: 401 });
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
    matcher: '/api/orders/:path*'
}