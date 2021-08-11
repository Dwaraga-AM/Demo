const mongoose = require('mongoose');
const customerSchema=mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    userName: {type: String},
    gender: {type: String},
    status: { type: Number}, // Active = 1 | Suspended = 2 | Pending = 3
    dateOfBbirth: {type: String},
    dob: {type: Date},
    ipAddress: {type: String},
    type: { type: Number} // 1 = Business | 2 = Individual
})
module.exports=mongoose.model('Customer',customerSchema);