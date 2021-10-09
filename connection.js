import { ConnectionCheckedInEvent, MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config();
const uri = process.env.MONGODB;
let instance = null
const client = new MongoClient(uri,{ useNewUrlParser: true, useUnifiedTopology: true });


async function getConnection(){
    try {
        if (instance == null){
            instance = client.connect();
        }
        else {
            return instance;
        } 
    } 

    catch(error){
        console.log(error)
    }
    
    return instance;
}

async function closeConnection(){
    instance.close()
}

export {getConnection, closeConnection}


