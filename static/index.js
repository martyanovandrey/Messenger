import { loginPage, registrationPage, chatPage, profilePage, profileChangesPage, profileChangePsw, error404, error500 } from './pages/pageTemplates/pageBlock.js';
import { router } from "./utils/router/router.js";
router
    .use('/', loginPage)
    .use('/signup', registrationPage)
    .use('/chat', chatPage)
    .use('/profile', profilePage)
    .use('/profile_changes', profileChangesPage)
    .use('/profile_change_psw', profileChangePsw)
    .use('/404', error404)
    .use('/500', error500)
    .start();
//# sourceMappingURL=index.js.map