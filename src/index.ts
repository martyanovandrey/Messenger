import {
    loginPage, registrationPage, chatPage, profilePage, profileChangesPage, profileChangePsw, error404, error500,
} from './pages/pageTemplates/pageBlock';
import { router } from './utils/router/router';
import './style/style_chat.css';
import './style/style_error.css';
import './style/style_profile.css';
import './style/style_reg.css';

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
