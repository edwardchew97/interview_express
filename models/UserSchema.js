const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const jwt = require('../utility/jwtUtility.js');
mongoose.set('useCreateIndex', true);

/////////////////////////////////
//          Schema             //
/////////////////////////////////
const userSchema = new Schema({
    email: { type: String, required:true, index:true, unique:true }, 
    name: { type: String, required:true, index:true },
    password: String,
},{collection:'users'});

userSchema.set('toObject', {
    getters: true,
    transform:(dot,ret,options)=>{
        delete ret._id
        //delete ret.id
        delete ret.password
        delete ret.__v
        return ret
    }
});

/////////////////////////////////
//          Methos             //
/////////////////////////////////
userSchema.methods.attempt = function(password) {
    if (!bcrypt.compareSync(password ,this.password))
        return false;
    
    const user = this.toObject()
    return {
        user,
        access_token : jwt.generateToken(user)
    };
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