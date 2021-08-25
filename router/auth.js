const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');

const Auth=require('../model/auth');
const { request } = require('http');

const router=express.Router();
// Get details of all user
router.get('/list',(req,res,next)=>{
      Auth.find()
        .then((userListResponse)=>{
          const totalUser=userListResponse.length;
          res.status(201).json({
            totalUser:totalUser,
            results:userListResponse
          });
        })
        .catch(err=>{
          res.status(500).json({
            err:err,
            message:"unable to find user"
          })
        })
});
// Get details of specific user
router.get('/view',(req,res,next)=>{
  const userId=req.query.userId;
  Auth.findById(userId)
    .then((currentUser)=>{
      res.status(201).json({
        results:currentUser
      });
    })
    .catch(err=>{
      res.status(500).json({
        err:err,
        message:"unable to find currentuser"
      })
    })
});

router.post("/registration",(req,res,next)=>{
  bcrypt.hash(req.body.password, 10)
     .then(hash =>{
       const user=new Auth({
        username:"",
        password: hash,
        email: req.body.email,
        roles:[{
          rolestype:"customer"
        }], 
        pic: "",
        fullname: req.body.fullname,
        firstname:"",
        lastname: "",
        occupation:"",
        companyName: "",
        phone: "",
        language: "",
        timeZone: "",
        communication: {
          emails: true,
          sms: true,
          phone: false
        },
        emailSettings: {
            emailNotification: true,
            sendCopyToPersonalEmail: false,
            activityRelatesEmail: {
              youHaveNewNotifications: false,
              youAreSentADirectMessage: false,
              someoneAddsYouAsAsAConnection: true,
              uponNewOrder: false,
              newMembershipApproval: false,
              memberRegistration: true
            },
            updatesFromKeenthemes: {
              newsAboutKeenthemesProductsAndFeatureUpdates: false,
              tipsOnGettingMoreOutOfKeen: false,
              thingsYouMissedSindeYouLastLoggedIntoKeen: true,
              newsAboutMetronicOnPartnerProductsAndOtherServices: true,
              tipsOnMetronicBusinessProducts: true
            }
          },
          address: {
            addressLine: '',
            city: '',
            state: '',
            postCode: '',
          },
          socialNetworks: {
            linkedIn: 'https://linkedin.com/user',
            facebook: 'https://facebook.com/user',
            twitter: 'https://twitter.com/user',
            instagram: 'https://instagram.com/user',
          } 
     });
     user.save()
       .then(result =>{
         res.status(201).json({
           message:"User Created",
           result: result
         });
       })
       .catch(err =>{
         res.status(500).json({
           error:err
         });
       });
   });
});

router.put('/update',(req,res,next)=>{
  const userId= req.body._id;
  console.log("request to update",request.body);
  let user={
    username:req.body.username,
    password: req.body.password,
    email:req.body.email,
    roles:req.body.roles, 
    pic: req.body.pic,
    fullname: req.body.fullname,
    firstname:req.body.firstname,
    lastname: req.body.lastname,
    occupation:req.body.occupation,
    companyName: req.body.companyName,
    phone: req.body.phone,
    language: req.body.language,
    timeZone: req.body.timeZone,
    communication:req.body.communication,
    emailSettings:req.body.emailSettings,
    address: req.body.address,
    socialNetworks:req.body.socialNetworks
};

  Auth.findByIdAndUpdate(userId,user)
  .then(userResponses=>{
    res.status(201).json({
      results:userResponses
    });
  })
  .catch(err=>{
    res.status(500).json({
      err:err,
      message:"unable to update the customer",
    })
  })
});

router.post('/login',(req,res,next)=>{
  let fetchedUser;
  console.log(req.body);
  Auth.findOne({ email: req.body.email })
    .then(user =>{
       if(!user){
         return res.status(401).json({
           message: "Auth failed"
         });
       }
       fetchedUser= user;
       console.log("user",user);
       return bcrypt.compare(req.body.password, user.password);
    })
    .then(result=>{
        if(!result){
          return res.status(401).json({
            message:"Auth failed"
          });
        }
        const token= jwt.sign(
          { email:fetchedUser.email,user:fetchedUser },
         "its_a_long_confidential_string",
         { expiresIn: "1h" }
         );
         console.log("userId is",fetchedUser._id);
         res.status(200).json({
           token: token,
           expiresIn: 3600,
           userId:fetchedUser,
         });
    })
    .catch(err =>{
        return res.status(401).json({
          message:"Auth failed"
        });
    })
});


module.exports=router;

/*  username: '',
        password: hash,
        email: req.body.email,
        roles: '2', 
        pic: './assets/media/users/100_2.jpg',
        fullname: req.body.fullname,
        firstname: '',
        lastname: '',
        occupation: '',
        companyName: '',
        phone: '',
        language: '',
        timeZone: '',
        communication: {
          emails: true,
          sms: true,
          phone: false
        },
        emailSettings: {
          emailNotification: true,
          sendCopyToPersonalEmail: false,
          activityRelatesEmail: {
            youHaveNewNotifications: false,
            youAreSentADirectMessage: false,
            someoneAddsYouAsAsAConnection: true,
            uponNewOrder: false,
            newMembershipApproval: false,
            memberRegistration: true
          },
          updatesFromKeenthemes: {
            newsAboutKeenthemesProductsAndFeatureUpdates: false,
            tipsOnGettingMoreOutOfKeen: false,
            thingsYouMissedSindeYouLastLoggedIntoKeen: true,
            newsAboutMetronicOnPartnerProductsAndOtherServices: true,
            tipsOnMetronicBusinessProducts: true
          },
        },
        address: {
          addressLine: '',
          city: '',
          state: '',
          postCode: '',
        },
        socialNetworks: {
          linkedIn: 'https://linkedin.com/user',
          facebook: 'https://facebook.com/user',
          twitter: 'https://twitter.com/user',
          instagram: 'https://instagram.com/user',
        } */