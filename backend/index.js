const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const users = require("./routes/users");
const posts = require("./routes/posts");
const passport = require("passport");
const path = require('path');
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const db = require("./config/keys").mongoURI;
const compression = require("compression");
const controller = require("./controller/file.controller")


app.use(cors());
app.use(compression());

global.__basedir = __dirname;

//ROUTES

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//passport Middleware
app.use(passport.initialize());

//passport Config
require("./config/passport")(passport);

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const filesRoutes = require("./routes/files");

app.use(express.urlencoded({ extended: true }));

filesRoutes(app);
app.use("/api/users", users);
app.use('/api/posts', posts);


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
