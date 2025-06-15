import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";

import mongoose from "mongoose";
import { DATABASE,WEB_CACHE, PORT,MAX_JSON_SIZE,REQUEST_NUMBER,REQUEST_TIME,URL_ENCODE } from "./app/config/config.js";
import router from "./routes/api.js"
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from "cookie-parser";



// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app=express();

//App Use Default Middleware
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,               // allow cookies to be sent
  })
);
app.use(helmet());
app.use(express.json({limit:MAX_JSON_SIZE}));
app.use(express.urlencoded({extended:URL_ENCODE}));
app.use(cookieParser());


// App use limiter 
const limiter=rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER})
app.use(limiter);

//cache
app.set('etag',WEB_CACHE);

//Database Connect
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("MongoDB connected");
}).catch(()=>{
    console.log("MongoDB disconnected");
})

app.use("/api",router);

//for connecting frontend
app.use(express.static('client/dist'));
app.get("*",function(req,res){
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})


app.listen(PORT,()=>{
    console.log("app run success");
})