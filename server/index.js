require('dotenv').config()
const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
const helmet = require("helmet");
const key = require("./configs/main.config");
const ConnectDB = require("./configs/db.config");
const path = require("path");
const isProduct = process.env.NODE_ENV === "production";

// config
const { port, mongoURL } = key;
// Database
ConnectDB(mongoURL);

// Middlewares
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
require("./routes/index.routing")(app);
// app.use('/api/auth', authRouter)
// app.use('/api/posts', postRouter)

if (isProduct) {
    app.use(express.static("../client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client", "build", "index.html"))
    })
}

// Connect server
app.listen(port, () => console.log(`Server started on port ${port}`))
