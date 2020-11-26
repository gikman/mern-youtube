const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const path = require('path');
const mongoose = require("mongoose");

const port = process.env.PORT || 5000

const MONGODB_URI = 'YOUR_MONGODB_URI'

mongoose.connect(MONGODB_URI || 'mongodb://localhost/mern_youtube', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));


// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
