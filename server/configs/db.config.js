const mongoose = require("mongoose");

const ConnectDB  = async (URL) => {
    try {
        await mongoose.connect(
            // `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@express-mobile-shop.pzlim.mongodb.net/v-shopping`,
            URL,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = ConnectDB ;