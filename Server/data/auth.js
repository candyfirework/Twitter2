// abcd1234:
//import SQ from 'sequelize';
import { getUsers } from "../db/database.js";
import MongoDb from "mongodb";
const ObjectID = MongoDb.ObjectId;
   
export async function findByUsername(username) {
    return getUsers().find({username})
    .next()
    .then(mapOptionalUser);
}
export async function createUser(user) {
   return getUsers().insertOne(user)
   .then((result)=>{
    console.log(result);
    //result.ops[0]._id.toString()
    });
}
export async function findById(id) {
    return getUsers()
    .find({_id: new ObjectID(id)})
    .next()
    .then(mapOptionalUser);
    // pk => primary key
}

function mapOptionalUser(user) {
    return user ? {...user, id: user._id.toString() } : user;
}