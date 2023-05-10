import dotenv from 'dotenv';
dotenv.config();
function required(key, defaultvalue = undefined) {
    const value = process.env[key] || defaultvalue;
    if(value == null) {
        throw new Error(`key ${key} is undefined`);
    }
    return value;
}
export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUND', 12)),
    },
    host: {
        port:parseInt(required('SERVER_PORT', 8080))
    },
    db:{
        host: required('DB_HOST'),
        user: required('DB_USER'),
        database:required('DB_DATABASE'),
        passowrd:required('DB_PASSWORD')
    }
}
