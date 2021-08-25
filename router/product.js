const express=require('express');
const mongoose=require('mongoose');

const Product=require('../model/e-commerce/product.model');
const Productspec=require('../model/e-commerce/product-specification.model');
const Productremark=require('../model/e-commerce/product-remark.model');
const Car=require('../model/e-commerce/product.model');
const routers=express.Router();

routers.post('/add',(req,res,next)=>{
    console.log("request to post new product",req.body); 
     let products=new Product({
         id: req.body.id,
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
         _userId:req.body._userId,
         _createdDate:req.body._createdDate,
         _updatedDate:new Date()
       })
          products.save()
           .then(result =>{
             console.log(result);
             res.status(201).json({
              message:"Product Created",
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
    const productId= req.body._id;
    console.log("request to post new product",req.body); 
     let products={
         id: { type: Number},
         model: { type: String},
         manufacture: { type: String},
         modelYear: { type: Number},
         mileage: { type: Number},
         description: { type: String},
         color: { type: String},
         price: { type: Number},
         condition: { type: Number},
         status: { type: Number},
         VINCode: { type: String},
         _userId:{type:String},
         _createdDate:{type: Date},
         _updatedDate:{type:Date}
       }
       Product.findByIdAndUpdate(productId,products)
       .then(productResponse=>{
         res.status(201).json({
           results:productResponse
         });
       })
       .catch(err=>{
         res.status(500).json({
           err:err,
           message:"unable to update the product",
         })
       })
});

routers.get('/list',(req,res,next)=>{
    console.log("request to get productlist",req.body);
    Product.find()
    .then((productListResponse)=>{
      const totalproduct=productListResponse.length;
      res.status(201).json({
        totalproduct:totalproduct,
        results:productListResponse
      });
    })
    .catch(err=>{
      res.status(500).json({
        err:err,
        message:"unable to find product"
      });
    });
});
  
routers.get('/view',(req,res,next)=>{
    const productId=req.query._id;
    Product.findById(productId)
    .then((productResponse)=>{
      const totalproduct=productResponse.length;
      res.status(201).json({
        totalproduct:totalproduct,
        results:productResponse
      });
    })
    .catch(err=>{
      res.status(500).json({
        err:err,
        message:"unable to find product"
      });
    });
});
  
routers.delete('/delete',(req,res,next)=>{
    const productId=req.query._id;
    Product.findByIdAndDelete(productId)
    .then((productResponse)=>{
      const totalproduct=productResponse.length;
      res.status(201).json({
        totalproduct:totalproduct,
        message:"product deleted"
      });
    })
    .catch(err=>{
      res.status(500).json({
        err:err,
        message:"unable to find product"
      });
    });
});
  
module.exports=routers;