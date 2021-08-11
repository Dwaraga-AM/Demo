const express=require('express');
const mongoose=require('mongoose');

const Productspec=require('../model/e-commerce/product-specification.model');
const Productremark=require('../model/e-commerce/product-remark.model');
const Customer=require('../model/e-commerce/customer.model');
const Car=require('../model/e-commerce/product.model');
const { request } = require('http');

const routers=express.Router();

routers.post('/addcustomer',(req,res,next)=>{
   console.log("request to post new customer",req.body); 
          let customers=new Customer({
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

routers.get('/customerlist',(req,res,next)=>{
  Customer.find()
  .then((customerListResponse)=>{
    const totalcustomer=customerListResponse.length;
    res.status(201).json({
      totalcustomer:totalcustomer,
      results:customerListResponse
    });
  })
  .catch(err=>{
    res.status(500).json({
      err:err,
      message:"unable to find customer"
    });
  });
});

routers.get('/viewcustomer',(req,res,next)=>{
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

routers.get('/viewcustomer',(req,res,next)=>{
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

routers.put('/updatecustomer',(req,res,next)=>{
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

routers.put('/updateproduct',(req,res,next)=>{
  console.log("request to post new customer",req.body); 
         let Productremark=new Customer({
          carId: req.body.carId,
          text: req.body.text,
          type: req.body.type, // Info 1, Note 2, Reminder 3
          dueDate: req.body.dueDate
     })
        Productremark.save()
         .then(result =>{
           console.log(result);
           res.status(201).json({
            message:"User Created",
            result: result,
            Productremarkdetails:Productremark
         })
         .catch(err =>{
           res.status(500).json({
             error:err
           });
         });
   });
});

routers.delete('/deletecustomer',(req,res,next)=>{
  console.log("request to post new customer",req.body); 
         let Productremark=new Customer({
          carId: req.body.carId,
          text: req.body.text,
          type: req.body.type, // Info 1, Note 2, Reminder 3
          dueDate: req.body.dueDate
     })
        Productremark.save()
         .then(result =>{
           console.log(result);
           res.status(201).json({
            message:"User Created",
            result: result,
            Productremarkdetails:Productremark
         })
         .catch(err =>{
           res.status(500).json({
             error:err
           });
         });
   });
});

routers.search('/searchcustomer',(req,res,next)=>{
  console.log("request to post new customer",req.body); 
         let Productremark=new Customer({
          carId: req.body.carId,
          text: req.body.text,
          type: req.body.type, // Info 1, Note 2, Reminder 3
          dueDate: req.body.dueDate
     })
        Productremark.save()
         .then(result =>{
           console.log(result);
           res.status(201).json({
            message:"User Created",
            result: result,
            Productremarkdetails:Productremark
         })
         .catch(err =>{
           res.status(500).json({
             error:err
           });
         });
   });
});

routers.put('/cars',(req,res,next)=>{
  console.log("request to post new car",req.body); 
  const productId= req.body._id;
        let cars=new Car({
        model: req.body.model,
        manufacture: req.body.manufacture,
        modelYear: req.body.modelYear,
        mileage: req.body.mileage,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        condition: req.body.condition,
        status: req.body.status,
        VINCode: req.body.VINCode,
        _createdDate:req.body._createdDate,
        _updatedDate:new Date()
     })
     Auth.findByIdAndUpdate(productId,cars)
     .then(productResponse=>{
       res.status(201).json({
         results:productResponse
       });
     })
     .catch(err=>{
       res.status(500).json({
         err:err,
         message:"unable to update the customer",
       })
     })
});

routers.post('/cars',(req,res,next)=>{
  console.log("request to post new car",req.body); 
        let cars=new Car({
        model: req.body.model,
        manufacture: req.body.manufacture,
        modelYear: req.body.modelYear,
        mileage: req.body.mileage,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        condition: req.body.condition,
        status: req.body.status,
        VINCode: req.body.VINCode,
        _createdDate:new  Date(),
        _updatedDate:""
     })
        cars.save()
         .then(result =>{
           console.log(result);
           res.status(201).json({
            message:"User Created",
            result: result,
            carsdetails:cars
         })
         .catch(err =>{
           res.status(500).json({
             error:err
           });
         });
   });
});

routers.put('/cars',(req,res,next)=>{
  console.log("request to post new car",req.body); 
  const productId= req.body._id;
        let cars=new Car({
        model: req.body.model,
        manufacture: req.body.manufacture,
        modelYear: req.body.modelYear,
        mileage: req.body.mileage,
        description: req.body.description,
        color: req.body.color,
        price: req.body.price,
        condition: req.body.condition,
        status: req.body.status,
        VINCode: req.body.VINCode,
        _createdDate:req.body._createdDate,
        _updatedDate:new Date()
     })
     Auth.findByIdAndUpdate(productId,cars)
     .then(productResponse=>{
       res.status(201).json({
         results:productResponse
       });
     })
     .catch(err=>{
       res.status(500).json({
         err:err,
         message:"unable to update the customer",
       })
     })
});

module.exports=routers;