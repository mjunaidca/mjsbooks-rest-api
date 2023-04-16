import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    const types = searchParams.getAll('type');
    const rawLimit = searchParams.get("limit");

    console.log(types)

    const conn = postgres({
        ssl: require,
    });

    const limit = rawLimit ? parseInt(rawLimit) : undefined;
    if (limit !== undefined && (isNaN(limit) || limit < 1 || limit > 20)) {
        return NextResponse.json(
            { error: "Invalid limit value. Limit should be between 1 and 20." },
            { status: 400 }
        );
    }


    const result = await conn.unsafe
        (`
        SELECT 
        books.id, books.name, books.author, book_types.type_name as type, books.available 
        FROM books
        JOIN book_types ON books.type_id = book_types.id
        ${types.length > 0 ? `WHERE book_types.type_name IN (${types.map((type: string) => `'${type}'`).join(', ')})` : ''}
        ${limit ? `LIMIT ${limit}` : ''}
        `);

    if (!result) {
        throw new Error('Books Not Found')
    }


    return NextResponse.json(result)
}


