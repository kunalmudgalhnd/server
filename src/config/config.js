import fastifySession from "@fastify/session";
import ConnectMongoDBSession from "connect-mongodb-session";
import "dotenv/config.js";
import { Admin } from "../models/index.js";


export const PORT = process.env.PORT || 3001;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;

const MongoDBStore = ConnectMongoDBSession(fastifySession)

export const sessionStore = new MongoDBStore({
    uri:process.env.MONGO_URI,
    collection:"sessions"
})

sessionStore.on('error',(error)=>{
    console.log("Session store error",error)
})

export const authenticate = async(email,password)=>{
    if(email && password){
        if(email==='kunal@gmail.com' && password==='12345678'){
            return Promise.resolve({ email: email, password });
        }else{
            return null
        }
    }


    // UNCOMMENT THIS WHEN CREATED ADMIN MANULLY
    //if(email && password){
    //    const user = await Admin.findOne({email});
    //    if (!user){
    //        return null
    //    }
    //    if(user.password===password){
    //        return Promise.resolve({ email: email, password: password });
    //    }else{
    //        return null
    //    }
    //}


    return null
}
