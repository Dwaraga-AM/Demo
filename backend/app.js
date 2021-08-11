const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');


const userRoutes=require('../router/auth');
const productRoutes=require('../router/product');
const app=express();
const dbURL="mongodb+srv://dwara:watson123@sandbox.vi6xr.mongodb.net/Demo_01";
const cookieparser=require('cookie-parser');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false); 

mongoose.connect(dbURL,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
  useCreateIndex: true,
  useFindAndModify: false })
  .then(()=>{
      console.log('connected to database!');
  })
  .catch(()=>{
    console.log('connection failed');
  })

app.use(bodyParser.urlencoded({ limit: '5mb', extended: true })); app.use(bodyParser.json({limit: '5mb'})); app.use(bodyParser.raw({limit: '5mb'}) );

  app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    " GET,POST,PUT,DELETE"
  );
  next();
  });
 app.get('/test',(req,res)=>{
   res.send('test1');
 })
 app.use(express.json());
 app.use(cookieparser());
 app.use("/api/site",productRoutes);
 app.use("/api/user",userRoutes);
module.exports=app;
