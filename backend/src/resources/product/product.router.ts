import { Router } from "express";
import productController from './product.controller';
import productSchema from "./product.schema";
import validateSchema from "../../middlewares/validateSchema";
import isAdmin from "../../middlewares/isAdmin";
import isAuth from "../../middlewares/isAuth";

const router = Router();

// Product Controller

// Product controller
router.get('/', productController.index);
router.get('/:id', productController.read);
router.post('/', isAdmin, isAuth, validateSchema(productSchema), productController.create);
router.put('/:id', isAdmin, isAuth, productController.update);
router.delete('/:id', isAdmin, isAuth, productController.remove);

export default router;