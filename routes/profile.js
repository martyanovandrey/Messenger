import {Router} from 'express'
import {profile, profileChange, avatar, passwordPage, password, getUserById, search} from '../controllers/profile.js'

const router = Router()

router.put(`/profile`, profile)

router.put(`/profile/change`, profileChange)

router.put(`/profile/avatar`, avatar)

router.get(`/password/:params`, passwordPage)

router.put(`/password`, password)

router.get(`/:id`, getUserById)

router.post(`/search`, search)

export  default  router