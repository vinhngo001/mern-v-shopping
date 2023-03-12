const authRouter = require("./auth.routing");
const userRouter = require("./user.routing");
const productRouter = require("./product.routing");
const categoriesRouter = require("./category.routing");
const uploadRouter = require("./upload.routing");
const paymentRouter = require("./payment.routing");

const baseUrl = "/api";

function createRouter(app) {
    app.use(baseUrl + "/auth", authRouter);
    app.use(baseUrl + "/user", userRouter);
    app.use(baseUrl + "/product", productRouter);
    app.use(baseUrl + "/category", categoriesRouter);
    app.use(baseUrl + "/upload", uploadRouter);
    app.use(baseUrl + "/payment", paymentRouter);
}

module.exports = createRouter;