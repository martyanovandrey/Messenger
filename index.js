import express from 'express'
import path from 'path'
import session from "express-session"

//import pageRoutes from "./routes/page.js"
import authRoutes from "./routes/auth.js"
import chatRoutes from "./routes/chat.js"
import profileRoutes from "./routes/profile.js"

import validateSession from "./controllers/validateSession.js"


const __dirname = path.resolve();
const app = express();
const PORT = 3000;
const API_PREFIX = '/api/v1';
const store = new session.MemoryStore();

//Load view engine
/*app.set('views', path.join(__dirname, 'src/pages/'));
app.set('view engine', 'pug')*/

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'secret',
  cookie: {maxAge: null},
  saveUninitialized: false,
  store
}))

/*app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'static/pages', 'index.html'));
});*/
app.use(express.static(`${__dirname}/static`));
app.get(`/*`, (req, res, next) => {
  console.log('send index.html');
  // if (req.url.startsWith(API_PREFIX)){
  //   console.log('abort mission ! <-------------');
  //   return next();
  // }
  res.sendFile(__dirname + "/static/index.html")
})
// app.use('', express.static(path.join(__dirname, '/static')))

app.use(`${API_PREFIX}/auth`, authRoutes)
app.use(`${API_PREFIX}/chats`, validateSession, chatRoutes)
app.use(`${API_PREFIX}/user`, validateSession, profileRoutes)




// app.get(`/*`, (req, res) => {
//   res.status(200).sendFile(__dirname + "/static/pages/index.html")
// })
//app.use(express.static('static'))
//app.use(express.static('src'))



export default app.listen(PORT, () => {
  console.log(`Мой текст и порт: ${PORT}!`);
});

/*app.get(`/`, (req, res) => {
  res.status(200).render(__dirname + "/src/pages")
})*/
// app.use('', express.static(path.join(__dirname, '/src')))