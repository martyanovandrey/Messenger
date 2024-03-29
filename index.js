import express from "express";
import path from "path";
import session from "express-session";

// import authRoutes from "./routes/auth";
// import chatRoutes from "./routes/chat";
// import profileRoutes from "./routes/profile";

//import validateSession from "./controllers/validateSession";

const __dirname = path.resolve();
const app = express();
const PORT = 3000;
const API_PREFIX = "/api/v1";
const store = new session.MemoryStore();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: "secret",
        cookie: { maxAge: null },
        saveUninitialized: false,
        store,
    })
);

app.use(express.static(`${__dirname}/dist`));
app.get("/*", (req, res, next) => {
    console.log("send index.html");
    res.sendFile(`${__dirname}/dist/index.html`);
});
//
// app.use(`${API_PREFIX}/auth`, authRoutes);
// app.use(`${API_PREFIX}/chats`, validateSession, chatRoutes);
// app.use(`${API_PREFIX}/user`, validateSession, profileRoutes);

export default app.listen(PORT, () => {
    console.log(`Мой текст и порт: ${PORT}!`);
});
