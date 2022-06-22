//requirements
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./models');
const userRoute = require("./routes/userRoute");
const teamRoute = require("./routes/teamRoute");
const todoRoute = require("./routes/todoRoute");

require("dotenv").config();

//middlewares
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(cookieParser());

//routes
app.use("/user",userRoute);
app.use("/team",teamRoute);
app.use("/todo",todoRoute);


const port = process.env.PORT || 5000;
db.sequelize.sync().then((req)=>{
    app.listen(port, ()=>{
        console.log(`${port} is active!`);
    });
})