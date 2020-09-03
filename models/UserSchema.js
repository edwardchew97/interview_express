const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const CustomError = require('../utility/CustomError');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

/////////////////////////////////
//          Schema             //
/////////////////////////////////
const userSchema = new Schema({
    email: { type: String, required:true, index:true, unique:true }, 
    name: { type: String, required:true, index:true },
    password: String,
},{collection:'users'});


/////////////////////////////////
//          Methos             //
/////////////////////////////////
userSchema.methods.attempt = function(password) {
    return bcrypt.compareSync(password ,this.password)
}

/////////////////////////////////
//           Hooks             //
/////////////////////////////////
userSchema.pre('save',function(next){
    // We hash the user's password when creating a user
    if (this.isNew){
        const salt=bcrypt.genSaltSync(10)
        this.password=bcrypt.hashSync(this.password,salt);
    }
    next()
})
let User =mongoose.model('User',userSchema);

module.exports = User