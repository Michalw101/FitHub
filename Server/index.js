const express = require('express');
const path = require('path');
const cors = require('cors');
// const session = require('express-session');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const PORT = process.env.PORT || 3000;

// // הגדרת session
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false } // should be true in production with HTTPS
// }));


const protectedRoute = require('./routes/protectedRoute');
app.use("/", protectedRoute);

const loginRouter = require("./routes/loginRouter");
app.use("/login", loginRouter);

const signupRouter = require("./routes/signupRouter");
app.use("/signup", signupRouter);

const classesRouter = require("./routes/classesRouter");
app.use("/classes", classesRouter);

const trainersRouter = require("./routes/trainersRouter");
app.use("/trainers", trainersRouter);

const uploadRouter = require("./routes/uploadRouter");
app.use('/upload', uploadRouter);

const trainerSignupRouter = require("./routes/trainerSignupRouter");
app.use("/trainer-signup", trainerSignupRouter);

const commentsRouter = require("./routes/commentsRouter");
app.use("/comments", commentsRouter);

app.listen(PORT, () => {
  console.log(`SERVER:   http://localhost:${PORT}`);
});
