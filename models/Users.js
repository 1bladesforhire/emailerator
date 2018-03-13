const mongoose = require('mongoose');


//const Schema = mongoose.Schema;
// can be written as line below
const { Schema } = mongoose;

//set property google id to be a string
const userSchema = new Schema({
  googleId: String
});

//create new collection called users if dne
mongoose.model('users', userSchema);