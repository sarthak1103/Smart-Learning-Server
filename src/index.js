require('dotenv').config();
const {
    DB_URI
} = process.env;

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const { application } = require('express');
const app= express();
const port=process.env.PORT||3000;
const auth= require('../middleware/auth');
const errors=require('../middleware/errors');
const {unless}= require('express-unless');


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./uploads"));


// connecting to database

mongoose.connect(`mongodb+srv://sarthak:sarthak@smart-learning.pqoo9gq.mongodb.net/?retryWrites=true&w=majority`,{
    
   useNewUrlParser : true,
   useUnifiedTopology : true,
//    useFindAndModify : true,
//    useCreateIndex : true,
})
.then(()=>console.log("connected to e-learning database")).catch((error)=>
   console.log(error.message));

auth.authenticateToken.unless=unless;
app.use(
  auth.authenticateToken.unless({
      path:[
        {url:"/users/login",methods:["POST"]},
        {url:"/users/register",methods:["POST"]},
         {url:"/",methods:["GET"]},
         {url:"/addCourse",methods:["POST"]},
         {url:"/contact",method:["POST"]},
      ],

  })
   );
//routes prefix

app.use("/",require('../routes/routes'));
app.use("/users",require('../routes/routes'));
app.use(errors.errorHandler); 
//start server

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
});
console.log(process.env.DB_URI);