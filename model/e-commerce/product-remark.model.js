const mongoose = require('mongoose');
const productremarkSchema=mongoose.Schema({
    id: { type: Number },
    carId: { type: Number },
    text: {type : String},
    type: { type: Number }, // Info 1, Note 2, Reminder 3
    dueDate: {type : String}
})
module.exports=mongoose.model('Productremark',productremarkSchema);