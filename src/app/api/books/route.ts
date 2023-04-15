import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {
    const conn = postgres({
        ssl: require,
    });
    const result = await conn.unsafe
        (`
        SELECT books.id, books.name, books.author, books.isbn, book_types.type_name as type, books.price, books.current_stock, books.available 
        FROM books
        JOIN book_types ON books.type_id = book_types.id;
    `);
    console.log(result);

    if (!result) {
        throw new Error('Books Not Found')
    }


    return NextResponse.json(result)
}