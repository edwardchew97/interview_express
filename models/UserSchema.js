var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);
const userSchema = new Schema({
    email: { type: String, required:true, index:true, unique:true }, 
    name: String,
    password: String,
},{collection:'User'});

let User =mongoose.model('User',userSchema);

module.exports = User