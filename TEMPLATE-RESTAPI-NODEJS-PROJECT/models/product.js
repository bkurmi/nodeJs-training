const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true
  },
  productDescription: {
    type: String,
    required: false
  },
  productPrice: {
    type : Number,
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema);