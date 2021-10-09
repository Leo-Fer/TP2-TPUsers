import { getConnection } from "./connection.js";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { ObjectId } from "bson";

dotenv.config();
const DB = process.env.DB
const COLLECTION_USERS = process.env.COLLECTION_USERS

async function getUsers(){
    try {
        const client = await getConnection();
        const res = client.db(DB)
                    .collection(COLLECTION_USERS)
                    .find()
                    .toArray();   

        return res 
    }

    catch(err){
        console.log(err)
    }
}

async function getUserbyEmail(email){
    try {
        const client = await getConnection();
        const res = await client.db(DB)
                        .collection(COLLECTION_USERS)
                        .findOne({email: email})   
        
        return res
    }
        
    catch(err){
        console.log(err)
    }
}

//VERSION 1 addUser
async function addUser(user){       
    try{
        const client = await getConnection();  
        
        return await getUserbyEmail(user.email) ? 'El usuario ya existe'
                :
                client.db(DB).collection(COLLECTION_USERS)
                .insertOne({
                    name: user.name,
                    email: user.email,
                    password: await bcrypt.hash(user.password, 10)
                });            
    } 
    
    catch(err){
        console.log(err)
    }    
}

//VERSION 2 addUser
/* async function addUser(user){    
    try{
        const client = await getConnection();  
        const exists = await getUserbyEmail(user.email);
        
        if(exists == null){
            const hashedPass = await bcrypt.hash(user.password, 10);
            user.password = hashedPass;
            const res = client.db(DB).collection(COLLECTION_USERS).insertOne(user)

            return res
        } 
        else {
            return 'Ya existe el usuario.'
        }                   
    } 
    
    catch(err){
        console.log(err)
    }    
} */

async function updateUser(user){
    try {
        const client = await getConnection();
        const query = {_id: new ObjectId(user.id)};
        const userUpdated = {
            $set: {
                email: user.email,
                name: user.name 
        }}

        const res = await client.db(DB)
                            .collection(COLLECTION_USERS)
                            .updateOne(query, userUpdated)

        return res
    }

    catch(err){
        console.log(err)
    }
}

async function deleteUser(id){
    try {
        const client = await getConnection();        
        const queryId =  {_id: new ObjectId(id)};

        const res = client.db(DB)
                .collection(COLLECTION_USERS)
                .deleteOne(queryId);
        
        return res;
    }

    catch(err){
        console.log(err)
    }
}

export {getUsers, addUser, getUserbyEmail, updateUser, deleteUser }