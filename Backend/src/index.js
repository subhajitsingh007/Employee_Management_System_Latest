import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './db/db.js';



dotenv.config(
  {
    path: './.env'
  }
)


// Connect to DB and start the server

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8080, ()=>{
        console.log(`Server is running at port :${
            process.env.PORT
        }`);
    })

})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})


