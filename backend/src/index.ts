import express from "express";
import dotenv from "dotenv";
import router from "./router";
import cookieParser from 'cookie-parser';
import setLangCookie from "./middlewares/setLangCookie";
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
import cors from "cors"
import getEnv from "./utils/getEnv";
// import { AddPurchaseItemDTO } from "./resources/purchaseItems/purchaseItems.types";

const env = getEnv()

dotenv.config();

// declare module "express-session" {
// interface SessionData {
//     uid: string;
//     tipoUsuario: string
//     // cart: AddPurchaseItemDTO[]
//     }
// }

const app = express();


app.use(session({
    genid: (req) => uuidv4(),
    secret: env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true
}));

app.use(cors({
    origin: env.FRONTEND_URL,
    credentials: true
}))

const PORT = env.PORT ?? 7788;
app.use(cookieParser());
app.use(setLangCookie);

app.use(express.json());
app.use(router);
app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`);})
