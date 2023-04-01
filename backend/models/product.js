const mongoose = require("mongoose");


const ProductoEsquema = new mongoose.Schema({
 id: {
   type: Number,
   required: true,
 },
 name: {
   type: String,
   required:true,
 },
 price: {
   type: Number,
   required:true,
 },
 description: {
   type: String,
  
 },
 images:[String],
});


module.exports = mongoose.model("Producto", ProductoEsquema);