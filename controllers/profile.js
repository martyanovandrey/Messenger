import {messages, users} from "../static/pages/storage.js"

export const profile = (req, res) => {
    console.log('GET PROFILE');
    //let login = req.session.user.login;
    let login = 'test'
    let userName = users.find(x => x.login === login);
    console.log('func profile !!!');
}

export const profileChange = (req, res) => {
    console.log('UPDATE PROFILE');
    //let login = req.session.user.login;
    let login = 'test'
    let userName = users.find(x => x.login === login);
    let data = req.body
    Object.assign(userName, data)
    console.log(userName);
    res.status(200).send(userName)
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
    res.status(200).send(userName)
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



