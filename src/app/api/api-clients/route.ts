import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import { randomUUID } from "crypto";

type RegisterClient = {
  clientName?: string;
  clientEmail?: string;
}


export async function POST(request: NextRequest) {

  const id = randomUUID();
  const access_token = randomUUID();

  const data: RegisterClient = await request.json();
  const { clientName, clientEmail } = data;

  const client_name = clientName;
  const client_email = clientEmail;

  const conn = postgres({
    ssl: require,
  });

  // Check if the client with the provided email already exists
  const clientExists = await conn.unsafe(`
    SELECT * FROM clients WHERE client_email = '${clientEmail}'
  `);

  // If the client exists, return an error with a 409 status code
  if (clientExists.length > 0) {
    return NextResponse.json('API client already registered. Try changing the values for clientEmail and clientName to something else.', {
      status: 409,
    });
  }


  const result = await conn.unsafe
    (`

    INSERT INTO clients (id, client_name, client_email, access_token) VALUES(
      '${id}',
      '${client_name}',
      '${client_email}',
      '${access_token}'
    )
    RETURNING access_token
        `);


  console.log(result[0]);

  if (!result) {
    throw new Error('Unable to Register API Client Not Found')
  }


  return NextResponse.json(result)
}


