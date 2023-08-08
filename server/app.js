const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();


if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config({path: "./config.env"});
}


//Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
//importing routes 
const post = require("./routes/post");
const user = require("./routes/user");

//routes to use
app.use("/api/v1", post);
app.use("/api/v1", user);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

module.exports = app;