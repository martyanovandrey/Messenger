import {messages, users} from "../controllers/storage.js"

export const profile = (req, res) => {
    console.log('GET PROFILE');
    //let login = req.session.user.login;
    let login = 'test'
    let userName = users.find(x => x.login === login);
    console.log(userName);
    res.render("profile/profile_changes/profile_changes.pug", {
        first_name: userName.first_name,
        second_name: userName.second_name,
        display_name: userName.display_name,
        login: userName.login,
        email: userName.email,
        phone: userName.phone
    })
}

export const profileChange = (req, res) => {
    console.log('UPDATE PROFILE');
    //let login = req.session.user.login;
    let login = 'test'
    let userName = users.find(x => x.login === login);
    let data = req.body
    for (const [key, value] of Object.entries(data)) {
        console.log('im here');
        if(data[key] != ''){
            console.log('im here222222');
            console.log(data[key]);
            userName[key] = data[key]
            console.log(userName);
        }
    }
    res.render("profile/profile/profile", {
        first_name: userName.first_name,
        second_name: userName.second_name,
        display_name: userName.display_name,
        login: userName.login,
        email: userName.email,
        phone: userName.phone
    })
}

export const avatar = (req, res) => {
    // const newUser = {id: v4(), ...req.body}
    // if (users.find(el => el.email === newUser.email)) {
    //     res.status(400).send({
    //         message: 'This email already used!'
    //     });
    // }
    // console.log(newUser)
    // users.push(newUser)
    // res.status(201).json(newUser)
}

export const passwordPage = (req, res) => {
    //let login = req.session.user.login;
    let login = 'test'
    let userName = users.find(x => x.login === login);
    let data = req.body
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
        console.log('im here');
        if(data[key] != ''){
            console.log('im here222222');
            console.log(data[key]);
            userName[key] = data[key]
            console.log(userName);
        }
    }
    res.render("profile/profile_change_psw/profile_change_psw", {
        oldPassword: userName.password
    })
}

export const password = (req, res) => {
    console.log('UPDATE PSW');
    //let login = req.session.user.login;
    let login = 'test'
    let userName = users.find(x => x.login === login);
    let data = req.body
    console.log(data);
    for (const [key, value] of Object.entries(data)) {
        console.log('im here');
        if(data[key] != ''){
            console.log('im here222222');
            console.log(data[key]);
            userName[key] = data[key]
            console.log(userName);
        }
    }
    res.redirect('/profile')
}

export  const getUserById = (req, res) => {
/*    console.log('getUser')
    res.status(200).json(auth)*/
}

export const search = (req, res) => {
    const newUser = {id: v4(), ...req.body}
    console.log("logout")
    res.status(201).json(newUser)
}



