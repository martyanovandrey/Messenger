import {Router} from 'express'
import {profile, profileChange, avatar, password, getUserById, search} from '../controllers/profile.js'

const router = Router()

router.put(`/profile`, profile)

router.put(`/profile/change`, profileChange)

router.put(`/profile/avatar`, avatar)

router.put(`/password/change`, password)

router.get(`/:id`, getUserById)

router.post(`/search`, search)

export  default  router