import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import { randomUUID } from "crypto";
import { log } from "console";

type PlaceOrder = {
    bookId?: number;
    customerName?: string;
}

export async function GET(request: NextRequest) {
    const conn = postgres({
        ssl: require,
    });

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Invalid access token.' });
    }
    const accessToken = authHeader.slice(7);

    console.log("This is ACCESS TOKEN" + accessToken);


    // Verify the access token and retrieve the client id
    const client = await conn.unsafe(`
  SELECT id FROM clients WHERE access_token = '${accessToken}'
`);

    console.log("CLIENT ID CALL" + client)

    // Check if the access token is valid
    if (client.length === 0) {
        return NextResponse.json({ "error": 'Invalid client id.' });
    }

    const client_id = client[0].id;
    console.log("Client ID: " + client_id);

    const result = await conn.unsafe
        (`
        SELECT * FROM orders WHERE client_id = '${client_id}'
    `);


    console.log(result[0]);

    if (!result) {
        throw new Error('Unable to Register API Client Not Found')
    }


    return NextResponse.json(result)


}


export async function POST(request: NextRequest) {

    const id = randomUUID();

    const data: PlaceOrder = await request.json();
    const { bookId, customerName } = data;

    const book_id = bookId;
    const client_name = customerName;

    const conn = postgres({
        ssl: require,
    });

    // Check if the book with the given bookId exists
    const book = await conn.unsafe(`
    SELECT * FROM books WHERE id = ${bookId}
    `);

    if (book.length === 0) {
        return NextResponse.json({ error: "Book not found." }, { status: 404 });
    }


    // Get the access token from the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Invalid access token.' });
    }
    const accessToken = authHeader.slice(7);

    console.log("This is ACCESS TOKEN" + accessToken);


    // Verify the access token and retrieve the client id
    const client = await conn.unsafe(`
  SELECT id FROM clients WHERE access_token = '${accessToken}'
`);

    console.log("CLIENT ID CALL" + client)

    // Check if the access token is valid
    if (client.length === 0) {
        return NextResponse.json({ "error": 'Invalid client id.' });
    }

    const client_id = client[0].id;
    console.log("Client ID: " + client_id);


    const result = await conn.unsafe
        (`
        INSERT INTO orders (id, book_id, client_id, customer_name, quantity)
        VALUES (
          '${id}',
          ${book_id},
          '${client_id}',
          '${client_name}',
          ${1}
        )
        RETURNING id AS OrderId
        `);


    console.log(result[0]);

    if (!result) {
        throw new Error('Unable to Place Order API Error')
    }

    if (result.length === 0) {
        return NextResponse.json('No Books Ordered')
    }



    return NextResponse.json(result[0])
}


