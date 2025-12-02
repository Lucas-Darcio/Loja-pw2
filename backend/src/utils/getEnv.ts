import { cleanEnv, port, str, url } from "envalid";
import dotenv from "dotenv";


dotenv.config();

function getEnv() {
    return cleanEnv(process.env, {
    FRONTEND_URL: url(),
    PORT: port(),
    SESSION_SECRET: str(),
    });
}

export default getEnv;