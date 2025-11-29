import { Router } from "express";
import usersController from "./user.controller";
import validateSchema from "../../middlewares/validateSchema";
import userSchema from "./user.schema";
import isAdmin from "../../middlewares/isAdmin";
import isAuth from "../../middlewares/isAuth";

const router = Router();

router.get('/', isAuth, isAdmin, usersController.index);
router.get('/:id', isAuth, isAdmin, usersController.read);
router.post("/", isAuth, isAdmin,  validateSchema(userSchema), usersController.create)
router.put('/:id', isAuth, isAdmin, validateSchema(userSchema), usersController.update);
router.delete('/:id', isAuth, isAdmin, usersController.remove);


export default router