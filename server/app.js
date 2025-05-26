const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const allSerice = require("../src/routes/index");
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_NAME = process.env.MONGO_NAME;
const app = express();
app.use(express.json());

const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
mongoose
    .connect(`${MONGO_URI}${MONGO_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("✅ Kết nối MongoDB thành công!");
    })
    .catch((err) => {
        console.error("❌ Kết nối MongoDB thất bại:", err.message);
    });
app.use((err, req, res, next) => {
    if (err) {
        res.status(err.statusCode || 500).json({ message: err.message });
    }
});
// Sử dụng routes
app.use("/auth", allSerice.accountRouter);
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
