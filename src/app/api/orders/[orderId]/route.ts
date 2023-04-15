import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import { randomUUID } from "crypto";
import { log } from "console";

type Props = {
    params: {
        orderId: string;
    }
}

export async function GET(request: NextRequest, { params: { orderId } }: Props) {
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
        SELECT * FROM orders WHERE client_id = '${client_id}' AND id = '${orderId}'
    `);


    console.log(result[0]);

    if (!result) {
        throw new Error('Unable to Register API Client Not Found')
    }


    return NextResponse.json(result)


}

export async function PATCH(request: NextRequest, { params: { orderId } }: Props) {

    const data = await request.json();
    const { customerName } = data;

    const conn = postgres({
        ssl: require,
    });

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Invalid access token.' });
    }
    const accessToken = authHeader.slice(7);

    console.log("This is ACCESS TOKEN" + accessToken);

    const result = await conn.unsafe
        (`
        UPDATE orders 
        SET customer_name = '${customerName}'
        WHERE id = '${orderId}';
    `);


    console.log(result[0]);

    if (!result) {
        throw new Error('Unable to Register API Client Not Found')
    }


    return NextResponse.json('Updated The Name' + ' ' + customerName)


}

export async function DELETE(request: NextRequest, { params: { orderId } }: Props) {

    const conn = postgres({
        ssl: require,
    });

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Invalid access token.' });
    }
    const accessToken = authHeader.slice(7);

    console.log("This is ACCESS TOKEN" + accessToken);

    const result = await conn.unsafe
        (`
        DELETE FROM orders 
        WHERE id = '${orderId}';
    `);


    console.log(result[0]);

    if (!result) {
        throw new Error('Unable to DELTE THE ORDER')
    }


    return NextResponse.json('Deleted The Order')


}