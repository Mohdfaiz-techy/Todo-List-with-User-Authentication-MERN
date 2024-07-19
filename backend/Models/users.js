const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type :"String",
required : true },
  email: {
    type :"String",
required : true,
unique : true },
  password: {
    type :"String",
required : true,
}
});
const Users = mongoose.model('user',UserSchema)
module.exports = Users;