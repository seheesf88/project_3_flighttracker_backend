const express = require('express');
const app     = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
require('./db/db');

app.use(session({
  secret: 'keyboard cat', //???
  resave: false,
  saveUninitialized: false
}));

//-----MIDDLEWARE---------
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const corsOptions = {
  origin: ['http://localhost:3000', 'https://localhost:3000', ],
  credentials: true,
  optionsSuccessStatus:200
}

app.use(cors(corsOptions));


//--------------------------

const reportController = require('./controllers/reportController');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

app.use('/api/v1/reports', reportController);
app.use('/api/v1/auth', authController);
app.use('/api/v1/users', userController);


app.listen(process.env.PORT || 9000, () => {
  console.log('I am working')
})
