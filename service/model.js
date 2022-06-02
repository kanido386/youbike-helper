const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const URI = process.env.MONGODB_URI;
mongoose.connect(`${URI}/demo`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const infoSchema = new Schema({
  station: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
    }
  },
  datatime: {
    type: Date,
    required: true,
  },
}, {
  strict: 'throw'
});

infoSchema.index({ location: '2dsphere' });
const Info = mongoose.model('Info', infoSchema);

module.exports = {
  Info
};