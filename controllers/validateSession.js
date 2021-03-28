const validateSession = (req, res, next) => {
    const { cookies } = req;
    console.log(req.url);
    if (req.session.authenticated){
        next()
    } else {
        //Commented only for develop
        next()
        //console.log('Session does not exist');
        //res.status(403).send({server_msg: 'Session ID does not exist'})
        /*res.redirect("/")*/
    }
}

export default validateSession