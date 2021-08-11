const mongoose = require('mongoose');
const productSpecSchema=mongoose.Schema({
  id: {type: Number},
  carId: {type: Number},
  specId: {type: Number},
  specName: { type: String},
  value: { type: String}
})
module.exports=mongoose.model('Productspec',productSpecSchema);