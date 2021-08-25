const mongoose = require('mongoose');
const carsSchema=mongoose.Schema({
  id: { type: Number},
  model: { type: String},
  manufacture: { type: String},
  modelYear: { type: Number},
  mileage: { type: Number},
  description: { type: String},
  color: { type: String},
  price: { type: Number},
  condition: { type: Number},
  status: { type: Number},
  VINCode: { type: String},
  _userId:{type:String},
  _createdDate:{type: Date},
  _updatedDate:{type:Date}
})
module.exports=mongoose.model('Product',carsSchema);