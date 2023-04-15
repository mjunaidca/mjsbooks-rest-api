import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = searchParams.get('limit');
    // const type = Object.fromEntries(searchParams.entries());

    console.log(type)

    const conn = postgres({
        ssl: require,
    });
    const result = await conn.unsafe
        (`
        SELECT 
        books.id, books.name, books.author, book_types.type_name as type, books.available 
        FROM books
        JOIN book_types ON books.type_id = book_types.id
        ${type ? `WHERE book_types.type_name = '${type}'` : ''}
        ${limit ? `LIMIT ${limit}` : ''}
        `);
    // WHERE book_types.type_name = '${t ype}'       

    // console.log(result);

    if (!result) {
        throw new Error('Books Not Found')
    }


    return NextResponse.json(result)
}


