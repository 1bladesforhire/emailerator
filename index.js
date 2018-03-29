const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');//give access to cookies
const passport = require('passport');//tell passport to use cookies
const keys = require('./config/keys');
const bodyParser = require('body-parser');
//no const needed b/c doesn't return anything
require('./models/Users');
require('./services/passport');


mongoose.connect(keys.mongoURI);
const app = express();

//middleware app.use
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,//set age to 30 days in milliseconds
    keys: [keys.cookieKey] //encryption key
  })
);

app.use(passport.initialize());
app.use(passport.session());

//call authroutes function with the app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  //like our main.js or main.css files
}

//route handlers moved to authRoutes.js in routes folder
//  for / location not used in this app
// app.get('/', (req, res) => {
//     res.send({ hi: 'Mike' });
// });


//set port to 5000 or as assigned by heroku
const PORT = process.env.PORT || 5000;
app.listen(PORT);