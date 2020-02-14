const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const config = require("./config/config");
const todoRouter = require("./router/todoRouter");

const app = express();
dotenv.config();

app.set("view engine", "ejs");


app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(todoRouter);

mongoose.set("useFindAndModify", false);



//listen to port 
const port = process.env.PORT || 8000;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect(config.databaseURL, options).then(() => {
    console.log("Server is started at port 8000")
    app.listen(port);
})