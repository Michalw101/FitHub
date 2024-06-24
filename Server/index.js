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

const PORT = process.env.PORT || 3000;

const protectedRoute = require('./routes/protectedRoute');
app.use("/", protectedRoute);

const loginRouter = require("./routes/loginRouter");
app.use("/login", loginRouter);

const logoutRouter = require("./routes/logoutRouter");
app.use("/logout", logoutRouter);

const signupRouter = require("./routes/signupRouter");
app.use("/signup", signupRouter);

const classesRouter = require("./routes/classesRouter");
app.use("/classes", classesRouter);

const waitingTraineeRouter = require("./routes/waitingTraineeRouter");
app.use("/waiting-trainee", waitingTraineeRouter);

const trainersRouter = require("./routes/trainersRouter");
app.use("/trainers", trainersRouter);

const newTrainersRouter = require("./routes/newTrainersRouter");
app.use("/new-trainers", newTrainersRouter);

const uploadRouter = require("./routes/uploadRouter");
app.use('/upload', uploadRouter);

const trainerSignupRouter = require("./routes/trainerSignupRouter");
app.use("/trainer-signup", trainerSignupRouter);

app.listen(PORT, () => {
  console.log(`SERVER: http://localhost:${PORT}`);
});
