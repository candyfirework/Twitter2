// password : abcd1234 -> $2b$10$Na0qDeTiUrfeDHZqnSF7yuzVoNvUI5rml57D/ZL11uk9wankrOWNO
/*let users = [{
    id: '1',
    username: 'melon', 
    password:'$2b$10$Na0qDeTiUrfeDHZqnSF7yuzVoNvUI5rml57D/ZL11uk9wankrOWNO',
    name:'이메론',
    email:'melon@melon.com',
    url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU'
    }
];*/
import {db} from '../db/database.js'

export async function findByUsername(username){
   // return users.find((user) => user.username === username)
   return db.execute('select * from users where username=?', [username]).then((result) => result[0][0]);
}

export async function createUser(user){
    const { username, password, name, email, url} = user;
    return db.execute('insert into users (username, password, name, email, url) values(?, ?, ?, ?, ?)', [username, password, name,email, url]).then((result) => result[0].insertId);
}
export async function findById(id){
    return db.execute('select id from users where id=?',[id]).then((result) => result[0][0]);
}