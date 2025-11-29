import { Router } from 'express';
import validateSchema from '../../middlewares/validateSchema';
import languageController from './language.controller';
import languagesSchema from './language.schema';

const router = Router();

router.get('/change', validateSchema(languagesSchema), languageController.changeLanguage);

export default router;