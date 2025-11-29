import express from "express";
import dotenv from "dotenv";
import router from "./router";
import cookieParser from 'cookie-parser';
import setLangCookie from "./middlewares/setLangCookie";
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';
// import { AddPurchaseItemDTO } from "./resources/purchaseItems/purchaseItems.types";


dotenv.config();

declare module "express-session" {
interface SessionData {
    uid: string;
    tipoUsuario: string
    // cart: AddPurchaseItemDTO[]
    }
}

const app = express();

app.use(session({
    genid: (req) => uuidv4(),
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true
}));

const PORT = process.env.PORT ?? 7788;
app.use(cookieParser());
app.use(setLangCookie);

app.use(express.json());
app.use(router);
app.listen(PORT, () => {console.log(`Servidor rodando na porta ${PORT}`);})
