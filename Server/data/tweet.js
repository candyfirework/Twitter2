import {db} from '../db/database.js';
import  * as userRepository from './auth.js'; // 0508

const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw left outer join users as us on tw.userId = us.id'
const ORDER_DESC = 'order by tw.createdAt desc';

export async function getAll(){  // 0508
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then((result) => result[0]);
}
export async function getAllByUsername(username){ // 0508
    return db.execute(`${SELECT_JOIN} WHERE username =? ${ORDER_DESC}`, [username])
    .then((result) => result[0]);
}

export async function getById(id){ // 0508
    return db.execute(`${SELECT_JOIN} WHERE tw.id =? ${ORDER_DESC}`, [id])
    .then((result) => result[0][0]);
}
export async function create(text,userId){ // 0508
    return db.execute('insert into tweets (text, createdAt, userId) values (?, ?, ?)', [text, new Date(), userId])
    .then((result) => console.log(result));
    /*const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        userId
    };
    tweets = [tweet, ... tweets];
    return getById(tweet.id);*/
}
export async function update(id,text){
    return db.execute(`update tweets set text =? where id =?`, [text, id])
    .then(() => getById(id));
}
export async function remove(id){
    return db.execute('delete from tweets where id =?', [id]);
}