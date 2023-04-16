import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

type Props = {
    params: {
        orderId: string;
    }
}

export async function GET(request: NextRequest, { params: { orderId } }: Props) {

    const conn = postgres({
        ssl: require,
    });

    try {
        // const authHeader = request.headers.get('Authorization');
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return NextResponse.json({ error: 'Invalid access token.' });
        // }
        // const accessToken = authHeader.slice(7);

        // console.log("This is ACCESS TOKEN" + accessToken);

        const result = await conn.unsafe(`
            SELECT * FROM orders WHERE id = '${orderId}'
        `);

        console.log("RESULT", result);

        if (result.length === 0) {
            return NextResponse.json({ error: 'Invalid Order ID' }, { status: 404 });
        }

        return NextResponse.json(result)
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Invalid Order ID' }, { status: 404 });
    }

}

export async function PATCH(request: NextRequest, { params: { orderId } }: Props) {

    const data = await request.json();
    const { customerName } = data;

    const conn = postgres({
        ssl: require,
    });

    try {
        // const authHeader = request.headers.get('Authorization');
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return NextResponse.json({ error: 'Invalid access token.' });
        // }
        // const accessToken = authHeader.slice(7);

        // console.log("This is ACCESS TOKEN" + accessToken);

        const result = await conn.unsafe(`
            UPDATE orders 
            SET customer_name = '${customerName}'
            WHERE id = '${orderId}';
        `);

        console.log(result[0]);

        return NextResponse.json('Updated The Name' + ' ' + customerName)

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Invalid Order ID' }, { status: 404 });
    }
}


export async function DELETE(request: NextRequest, { params: { orderId } }: Props) {

    const conn = postgres({
        ssl: require,
    });

    try {
        // const authHeader = request.headers.get('Authorization');
        // if (!authHeader || !authHeader.startsWith('Bearer ')) {
        //     return NextResponse.json({ error: 'Invalid access token.' });
        // }
        // const accessToken = authHeader.slice(7);

        // console.log("This is ACCESS TOKEN" + accessToken);

        const result = await conn.unsafe(`
            DELETE FROM orders 
            WHERE id = '${orderId}';
        `);

        console.log(result[0]);

        return NextResponse.json('Deleted The Order')

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Invalid Order ID' }, { status: 404 });
    }
}
