import {Router} from 'express';
import {
  signup, getUser, signin, logout,
} from '../controllers/auth.js';

const router = Router();

router.post('/signup', signup);

router.post('/signin', signin);

router.get('/user', getUser);

router.post('/logout', logout);

export default router;
