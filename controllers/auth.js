import {v4} from "uuid";
import {users} from '../static/pages/storage.js'

export const signup = (req, res) => {
    const newUser = {id: v4(), ...req.body}
    console.log(req.body)
    console.log(users)
    if (users.find(el => el.email === newUser.email)) {
        res.status(400).send({
            message: 'This email already used!'
        });
    } else if (Object.values(newUser).some(x => (x === ''))) {
        res.status(400).send({
            message: 'Fields cant be empty!'
        });
    }
    const name = req.body.name
    console.log(newUser)
    users.push(newUser)

    res.redirect('/chat')
}

export const signin = (req, res) => {
    const {login, password} = req.body
    //console.log(user.login, user.password)
    console.log(users)
    console.log(req.body)
    if (users.find((el) => el.login === login && el.password === password)) {
        console.log("Logged !")
        req.session.authenticated = true;
        req.session.user = {
            login
        }
        res.redirect('/chat')
    } else {
        res.status(403).send({server_msg: 'Wrong login or password'})
    }
}

export  const getUser = (req, res) => {
    console.log('getUser')
    res.status(200).json(auth)
}

export const logout = (req, res) => {
    const newUser = {id: v4(), ...req.body}
    console.log("logout")
    res.status(201).json(newUser)
}

/*
export const remove = (req, res) => {
    console.log('ID', req.params.id)
    users = users.filter(s => s.id !== req.params.id)
    res.json({message: 'Deleted'})
}
*/



