const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const path = require('path');
const mongoose = require("mongoose");

// const config = require("./config/key");
const port = process.env.PORT || 5000

const MONGODB_URI = 'mongodb+srv://sangzor99:sebzor99@cluster0.t0vzr.mongodb.net/youtubeclone?retryWrites=true&w=majority'


mongoose.connect(MONGODB_URI || 'mongodb://localhost/mern_youtube', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});
// mongoose.connect(config.mongoURI, { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// })
//   .then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err));
app.use(morgan('tiny'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));


// app.get('/api', (req, res) => {
//   const data = {
//     username: 'test',
//     age: 25
//   };
//   res.json(data);
// });

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