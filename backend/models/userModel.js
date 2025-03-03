const mongoose= require('mongoose');
const bcrypt = require('bcryptjs');

const Schema= mongoose.Schema;

const userSchema= new Schema ({
    username:{type:String, required: true},
    email: {type:String, required: true, unique:true},
    password:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    name:{type:String, required:true},
    role:{type:String,enum:['User', 'Manager'], default: 'User', required:true},
    googleID:{type:String},
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    


});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) {
      return next();
    }
    
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });
  
  
  const User = mongoose.models.User || mongoose.model('User', userSchema);

  module.exports = User;
