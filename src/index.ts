import {loginPage, registrationPage, chatPage, profilePage, profileChangesPage, profileChangePsw} from './pages/pageTemplates/pageBlock.js'
import {router} from "./utils/router/router.js";

router
    .use('/', loginPage)
    .use('/signup', registrationPage)
    .use('/chat', chatPage)
    .use('/profile', profilePage)
    .use('/profile_changes', profileChangesPage)
    .use('/profile_change_psw', profileChangePsw)
    .start();