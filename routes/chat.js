import {Router} from 'express';
import {chats} from '../controllers/chat.js';

const router = Router();

router.post('/', chats);

export default router;
