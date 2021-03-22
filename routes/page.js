import {Router} from 'express'
import {login, register, chatPage, profilePage} from '../controllers/page.js'
import validateSession from '../controllers/validateSession.js'

const router = Router()

//signin (login) page
router.get(`/`, login)

//signup (register) page
router.get(`/signup`,validateSession, register)

//chat page
router.get(`/chats`,validateSession, chatPage)

//profile page
router.get(`/profile`,validateSession, profilePage)

export  default  router


