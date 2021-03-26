// import {users} from '../static/pages/storage.js'
//
// export const login = (req, res) => {
//     res.render("login")
// }
//
// export const register = (req, res) => {
//     res.render("registration/registration")
// }
//
// export const chatPage = (req, res) => {
//     res.render("chat/chat/chat")
// }
//
// export const profilePage = (req, res) => {
//     //let login = req.session.user.login;
//     let login = 'test'
//     let currentUser = users.find(x => x.login === login)
//     res.render("profile/profile/profile", {
//         first_name: currentUser.first_name,
//         second_name: currentUser.second_name,
//         display_name: currentUser.display_name,
//         login: currentUser.login,
//         email: currentUser.email,
//         phone: currentUser.phone
//     })
// }
//
