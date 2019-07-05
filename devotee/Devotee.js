var mongoose = require('mongoose'); 
mongoose.plugin(require('meanie-mongoose-to-json'));
var DevoteeSchema = new mongoose.Schema({  
  initiatedName: String,
  diacriticsName: String,
  firstInitiationDate: String,
  secondInitationDate: String,
  initiationPlace: String,
  firstName: String,
  lastName: String,
  location: String,
  country: String,
  nationality: String,
  dob: String,
  contactNo: Number,
  email: String,
  address: String,
  additionalInformation: String,
  lastUpdatedDate: String,
  createdTimestamp: { type: String, default: '' },
});
mongoose.model('Devotee', DevoteeSchema);

module.exports = mongoose.model('Devotee');