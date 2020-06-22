const express = require("express");
const app = express();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require('body-parser')
const UserRoutes = require("./routes/UserRoutes")
const MessagesRoutes=require('./routes/Messages')
const path=require('path')
const config = require("./config/key");
var morgan= require('morgan')
const helmet = require('helmet');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));




// parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(helmet())



// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: config.mongoURI,
    collection: "mySessions"
});


mongoDBstore.on('connected', () => console.log("mongoDBstore Connected"))
mongoDBstore.on('error', () => console.log("mongoDBstore not connected"))



app.use(
  session({
    name: config.COOKIE_NAME,
    secret: config.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoDBstore,
    proxy : true,              // this should be true for session to be work on heroku
    cookie: {
      maxAge: 1000 * 60 * 60 * 3, // Three hours
      sameSite: false,
      secure: config.IS_PROD,
    }
  })
);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  next();
});


const PORT = process.env.PORT || 4000

var users=[]
io.on('connection',socket=>{
  console.log("Socket is connected..."+socket.id)
  socket.on('newUser', (data) =>{
      data.socketId=socket.id
      users.push(data)
       users=[...new Set(users.map(JSON.stringify))].map(JSON.parse)
    io.emit('online', users);
  });

  socket.on('offline',data=>{
    users=users.filter(user=>user._id!=data._id)
    io.emit('online', users);
  })

  socket.on('disconnect', (data) => {

    users=users.filter(user=>user.socketId!=socket.id)
    io.emit('online', users);
  })
  
})

app.use((req, res, next) =>{
  req.io = io;
  
  next();
});



app.use("/api/user", UserRoutes)
app.use('/api/messages', MessagesRoutes);


if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,"../",'client/build')))

  app.get('*',(req,res)=>{
      res.sendFile(path.join(__dirname,"../",'client','build','index.html'))
  })
}


server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
