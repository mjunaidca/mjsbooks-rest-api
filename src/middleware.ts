import { NextRequest, NextResponse } from 'next/server'

// Middleware no Node JS
// Create a seperate API and fetch in middleware
// In middleware call self api and get the data

// export async function middleware(request: NextRequest) {
//     console.log('Middleware ran');

//     console.log('Middleware ran')

//     console.log(request.method)
//     console.log(request.url)

//     // const origin = request.headers.get('origin')
//     // console.log(origin);

//     return NextResponse.next()

// }

// export const config = {
//     matcher: '/api/:path*'
// }



async function fetchAccessToken() {
    const getAllTokens = await fetch('http://localhost:3000/api/accessToken', {
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