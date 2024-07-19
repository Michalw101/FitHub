const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser()); 

app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

const PORT = process.env.PORT || 3001;

const usersRouter = require('./routes/usersRouter');
app.use("/users", usersRouter);

const adminRouter = require('./routes/adminRouter');
app.use("/admin", adminRouter);

const loginRouter = require("./routes/loginRouter");
app.use("/login", loginRouter);

const notificationsRouter = require("./routes/notificationsRouter");
app.use("/notifications", notificationsRouter);

const logoutRouter = require("./routes/logoutRouter");
app.use("/logout", logoutRouter);

const signupRouter = require("./routes/signupRouter");
app.use("/signup", signupRouter);

const classesRouter = require("./routes/classesRouter");
app.use("/classes", classesRouter);

const myClassesRouter = require("./routes/myClassesRouter");
app.use("/my-classes", myClassesRouter);

const trainersRouter = require("./routes/trainersRouter");
app.use("/trainers", trainersRouter);

const traineesRouter = require("./routes/traineesRouter");
app.use("/trainees", traineesRouter);

const newTrainersRouter = require("./routes/newTrainersRouter");
app.use("/new-trainers", newTrainersRouter);

const uploadRouter = require("./routes/uploadRouter");
app.use('/upload', uploadRouter);


app.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});
