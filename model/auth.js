const mongoose = require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const userSchema=mongoose.Schema({
  username: {type :String},
  password: {type:String,required:true},
  fullname: {type:String,required:true},
  email: {type:String,required:true},
  pic: {type:String},
  roles: {type: Array},
  occupation: {type:String},
  companyName: {type:String},
  phone: {type:Number},
  address: {
    addressLine: {type:String},
    city: {type:String},
    state: {type:String},
    postCode: {type:String}
  },
  socialNetworks: {
    linkedIn: {type:String},
    facebook: {type:String},
    twitter: {type:String},
    instagram: {type:String}
  },
  // personal information
  firstname: {type:String},
  lastname: {type:String},
  website: {type:String},
  // account information
  language: {type:String},
  timeZone: {type:String},
  communication: {
    emails: {type:Boolean},
    sms: {type:Boolean},
    phone: {type:Boolean}
  },
  // email settings
  emailSettings: {
    emailNotification: {type:Boolean},
    sendCopyToPersonalEmail: {type:Boolean},
    activityRelatesEmail: {
      youHaveNewNotifications: {type:Boolean},
      youAreSentADirectMessage: {type:Boolean},
      someoneAddsYouAsAsAConnection: {type:Boolean},
      uponNewOrder: {type:Boolean},
      newMembershipApproval: {type:Boolean},
      memberRegistration: {type:Boolean}
    },
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: {type:Boolean},
      tipsOnGettingMoreOutOfKeen: {type:Boolean},
      thingsYouMissedSindeYouLastLoggedIntoKeen: {type:Boolean},
      newsAboutMetronicOnPartnerProductsAndOtherServices: {type:Boolean},
      tipsOnMetronicBusinessProducts: {type:Boolean}
    }
  }
});

userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('Auth',userSchema);