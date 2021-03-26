import {Router} from 'express'
import {signup, getUser, signin, logout} from '../controllers/auth.js'

const router = Router()

//signup - create user
router.post(`/signup`, signup)

router.post(`/signin`, signin)

router.get(`/user`, getUser)

router.post(`/logout`, logout)

//router.delete(`${API_PREFIX}/auth/signup`, remove)

//router.put()

export  default  router