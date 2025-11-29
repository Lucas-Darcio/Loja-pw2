import { Router } from "express";
import productController from './product.controller';
import productSchema from "./product.schema";
import validateSchema from "../../middlewares/validateSchema";
const router = Router();

// Product Controller

// Product controller
router.get('/', productController.index);
router.get('/:id', productController.read);
router.post('/', validateSchema(productSchema), productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

export default router;