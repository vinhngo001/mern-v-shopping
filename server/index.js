require('dotenv').config()
const express = require('express')
const cors = require('cors');
const helmet = require("helmet");
const key = require("./configs/main.config")
const ConnectDB = require("./configs/db.config");

// config
const { port, mongoURL } = key
// Database
ConnectDB(mongoURL)

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
require("./routes/index.routing")(app);
// app.use('/api/auth', authRouter)
// app.use('/api/posts', postRouter)

// Connect server
app.listen(port, () => console.log(`Server started on port ${port}`))
