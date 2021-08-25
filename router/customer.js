const express=require('express');
const mongoose=require('mongoose');

const Customer=require('../model/e-commerce/customer.model');
const Car=require('../model/e-commerce/product.model');

const routers=express.Router();

routers.post('/add',(req,res,next)=>{
   console.log("request to post new customer",req.body); 
          let customers=new Customer({
           firstName: req.body.firstName,
           lastName: req.body.lastName,
           email: req.body.email,
           userName: req.body.userName,
           gender: req.body.gender,
           status: req.body.status, // Active = 1 | Suspended = 2 | Pending = 3
           dateOfBbirth: req.body.dateOfBbirth,
           ipAddress: req.body.ipAddress,
           type: req.body. type ,
           _createdDate: new Date().toLocaleString().split(',')[0],
           _updatedDate:new Date()
      })
         customers.save()
          .then(result =>{
            console.log(result);
            res.status(201).json({
             message:"User Created",
             result: result
          })
          .catch(err =>{
            res.status(500).json({
              error:err
            });
          });
    });
});

routers.put('/update',(req,res,next)=>{
  const customerId= req.body._id;
  console.log("request to post new customer",req.body); 
         let customers= {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          userName: req.body.userName,
          gender: req.body.gender,
          status: req.body.status, // Active = 1 | Suspended = 2 | Pending = 3
          dateOfBbirth: req.body.dateOfBbirth,
          ipAddress: req.body.ipAddress,
          type: req.body. type ,
          _createdDate: new Date(),
          _updatedDate:new Date()

     }
     Customer.findByIdAndUpdate(customerId,customers)
     .then(customerResponse=>{
       res.status(201).json({
         results:customerResponse
       });
     })
     .catch(err=>{
       res.status(500).json({
         err:err,
         message:"unable to update the customer",
       })
     })
});

routers.get('/list',(req,res,next)=>{
  console.log("request to get customerlist",req.body);
  Customer.find()
  .then((customerListResponse)=>{
    const totalcustomer=customerListResponse.length;
    res.status(201).json({
      customerListResponse
    });
  })
  .catch(err=>{
    res.status(500).json({
      err:err,
      message:"unable to find customer"
    });
  });
});

routers.post('/namelist',(req,res,next)=>{
  console.log("request to get customerlist",req.body);
  Customer.find()
  .then((customerListResponse)=>{
    const totalcustomer=customerListResponse.length;
    res.status(201).json({
      customerListResponse
    });
  })
  .catch(err=>{
    res.status(500).json({
      err:err,
      message:"unable to find customer"
    });
  });
});

routers.get('/view',(req,res,next)=>{
  const userId=req.query._id;
  Customer.findById(userId)
  .then((customerResponse)=>{
    const totalcustomer=customerResponse.length;
    res.status(201).json({
      totalcustomer:totalcustomer,
      results:customerResponse
    });
  })
  .catch(err=>{
    res.status(500).json({
      err:err,
      message:"unable to find customer"
    });
  });
});

routers.delete('/delete',(req,res,next)=>{
  const userId=req.query._id;
  Customer.findByIdAndDelete(userId)
  .then((customerResponse)=>{
    const totalcustomer=customerResponse.length;
    res.status(201).json({
      totalcustomer:totalcustomer,
      message:"userdeleted"
    });
  })
  .catch(err=>{
    res.status(500).json({
      err:err,
      message:"unable to find customer"
    });
  });
});

routers.search('/search',(req,res,next)=>{
      const userId=req.query._id;
         let customers={
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          userName: req.body.userName,
          gender: req.body.gender,
          status: req.body.status, // Active = 1 | Suspended = 2 | Pending = 3
          dateOfBbirth: req.body.dateOfBbirth,
          dob: req.body.dob,
          ipAddress: req.body.ipAddress,
          type: req.body. type 
     }
        Customer.findByIdAndUpdate(userId,customers)
         .then(customerResponse =>{
           res.status(201).json({
            message:"User Updated",
            result: customerResponse
         })
         .catch(err =>{
           res.status(500).json({
             error:err,
             message:"unable to update the customer"
           });
         });
   });
});

module.exports=routers;