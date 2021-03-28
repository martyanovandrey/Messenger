const validateCookie = (req, res, next) => {
    const { cookies } = req;
    console.log(req.url);
    if ('session_id' in cookies){
        console.log('Session ID exist');
        if (cookies.session_id === 'test') {
            console.log('Authenticated');
            next()
        } else {
            console.log('Not Authenticated');
            console.log(cookies.session_id);
            res.status(403).send({server_msg: 'Not Authenticated'})
        }
    } else {
        console.log('Session ID does not exist');
        res.status(403).send({server_msg: 'Session ID does not exist'})
    }
}

export default validateCookie