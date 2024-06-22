import express from 'express';
import { UserController } from '../controllers/user.controller';
import { loginRules, registrationRules } from '../validation/user.validation';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.route('/register').post(registrationRules, validateRequest, UserController.register);
router.route('/login').post(loginRules, validateRequest, UserController.login);
router.route('/logout').post(UserController.logout);

const userRouter = router;

export { userRouter };