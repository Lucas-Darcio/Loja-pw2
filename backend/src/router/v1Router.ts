// Arquivo src/router/v1Router.ts
import express from 'express';
import productRouter from '../resources/product/product.router';
import languageRouter from '../resources/language/language.router';
import authRouter from '../resources/auth/auth.router';
import userRouter from '../resources/users/user.router';
import purchaseItemRouter from '../resources/PurchaseItem/purchaseItem.router'
import purchaseRouter from '../resources/Purchase/purchase.router'

const router = express.Router();
router.use('/', authRouter);
router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/purchaseItem', purchaseItemRouter);
router.use('/purchase', purchaseRouter);
router.use('/language', languageRouter);



export default router;