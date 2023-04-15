import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

type Props = {
    params: {
        id: string;
    }
}

export async function GET(request: NextRequest, { params: { id } }: Props) {

    const conn = postgres({
        ssl: require,
    });
    const result = await conn.unsafe
        (`
        SELECT 
        books.id, 
        books.name, 
        books.author, 
        books.isbn, 
        book_types.type_name AS type,
        books.price, 
        books.current_stock, 
        books.available
    FROM books
    JOIN book_types ON books.type_id = book_types.id
    WHERE books.id = ${id}
    
        `);

    // console.log(result);

    if (!result) {
        throw new Error('Books Not Found')
    }


    return NextResponse.json(result)
}


