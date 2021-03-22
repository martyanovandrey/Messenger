import express from 'express'
import path from 'path'
import session from "express-session"

import pageRoutes from "./routes/page.js"
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
app.set('views', path.join(__dirname, 'src/pages/'));
app.set('view engine', 'pug')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'secret',
  cookie: {maxAge: null},
  saveUninitialized: false,
  store
}))

app.use(`/`, pageRoutes)
app.use(`${API_PREFIX}/auth`, authRoutes)
app.use(`${API_PREFIX}/chats`, validateSession, chatRoutes)
app.use(`${API_PREFIX}/user`, validateSession, profileRoutes)

app.use('', express.static(path.join(__dirname, '/static')))
app.use('', express.static(path.join(__dirname, '/src')))

export default app.listen(PORT, () => {
  console.log(`Мой текст и порт: ${PORT}!`);
});

