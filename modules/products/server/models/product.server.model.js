'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Product name',
    unique: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['P', 'S', 'R']
  },
  isincludevat: {
    type: Boolean,
    default: false,
    required: 'Please fill Product isincludevat',
  },
  saleprice: {
    type: Number,
    required: 'Please fill Product saleprice',
  },
  buyprice: Number,
  priceincludevat: Number,
  priceexcludevat: Number,
  unitname: String,
  description: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Product', ProductSchema);
