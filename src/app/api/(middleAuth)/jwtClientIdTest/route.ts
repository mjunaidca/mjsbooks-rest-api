
import { jwtVerify, SignJWT } from "jose";

export const runtime = 'experimental-edge';

interface UserJwtPayload {
    jti: string;
    iat: number;
    id?: any
}

const secretKey = 'DbxHHxIAVxgl3dVzut6pmPFUPCIre5FcuEa828VVMqw';

export const getJwTSecretKey = () => {
    const secret = secretKey;

    if (!secret || secret.length === 0) {
        throw new Error("JWT_SECRET is not defined");
    }

    return secret;
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwTSecretKey()));
        return verified.payload as UserJwtPayload;
    } catch (error) {
        throw new Error("Your token has expired.");
    }
}

