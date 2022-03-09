const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connection Success");
});


//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);



app.listen(8800, () => {
    console.log("Server Started");
})
