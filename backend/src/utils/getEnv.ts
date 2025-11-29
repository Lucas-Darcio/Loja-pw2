import { cleanEnv, port, str } from "envalid";
import dotenv from "dotenv";

dotenv.config();

function getEnv() {
    return cleanEnv(process.env, {
    PORT: port(),
    });
}

export default getEnv;