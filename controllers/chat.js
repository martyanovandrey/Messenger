import {users, messages} from '../static/pages/storage.js'



export const chats = (req, res) => {
    console.log(req.body);
    let userName = users.find(x => x.id === req.body.id).first_name;
    let chatMessages = messages.find(x => x.chat === userName);
    console.log('GET CHATS');
    //res.mydata={test: 'test'}
    res.status(200).send(userName)
}




