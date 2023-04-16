import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";

type RegisterClient = {
  clientName?: string;
  clientEmail?: string;
}


export async function POST(request: NextRequest) {

  const secretKey = 'DbxHHxIAVxgl3dVzut6pmPFUPCIre5FcuEa828VVMqw';

  const id = randomUUID();

  // const access_token = randomUUID();

  // Generate the access_token using JWT - We are encoding id as we will later decode it in /api/orders
  const access_token = jwt.sign({ id }, secretKey, { expiresIn: '7d' }); // Set the token expiration time as needed (e.g., '7d' for 7 days)

  const data: RegisterClient = await request.json();
  const { clientName, clientEmail } = data;

  // Check if the clientName field is missing or empty
  if (!clientEmail || clientEmail.trim() === '') {
    return NextResponse.json({ error: 'Missing or incorrect clientEmail field.' }, { status: 400 });
  }

  const conn = postgres({
    ssl: require,
  });

  // Check if the client with the provided email already exists
  const clientExists = await conn.unsafe(`
    SELECT * FROM clients WHERE client_email = '${clientEmail}'
  `);

  // If the client exists, return an error with a 409 status code
  if (clientExists.length > 0) {
    return NextResponse.json('API client already registered. Try changing the values for clientEmail to something else.', {
      status: 409,
    });
  }


  const result = await conn.unsafe
    (`
    INSERT INTO clients (id, client_name, client_email, access_token) VALUES(
      '${id}',
      '${clientName}',
      '${clientEmail}',
      '${access_token}'
    )
    RETURNING access_token
    `);


  console.log(result[0]);

  if (!result) {
    throw new Error('Unable to Register API Client Not Found')
  }

  return NextResponse.json({ "AccessToken:": access_token })
};


