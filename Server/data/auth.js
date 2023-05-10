import {db} from '../db/database.js';

// abcd1234 -> $2b$10$jiHvT2MVzy2dSOFI9tnJeu.AwFbaGtB.zGVrzr8dkyHwhV6WwT8YC 

//이제 DB연결하여 사용
// let users= [
// {
//     id:"1",
//     username:"melon",
//     password : "$2b$10$jiHvT2MVzy2dSOFI9tnJeu.AwFbaGtB.zGVrzr8dkyHwhV6WwT8YC",
//     name : "이메론",
//     email : "melon@gmail.com",
//     url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS87Gr4eFO7Pt2pE8oym4dxXnxGZYL2Pl_N5A&usqp=CAU"
// }
// ]

export async function findByUsername(username){
    // return users.find((user)=> user.username === username)
    // result 에 [0][0] 은 id 번호를 인덱싱 한것이고 이것이 본래 id값과 비교하여 있으면 값을 반환하고 없다면 빈값을 반환한다.
    return db.execute("SELECT * from users WHERE username =?",[username])
    .then((result)=> result[0][0]);
}

export async function createUser(user){
    // const created ={...user, id:Date.now().toString()};
    // users.push(created);
    // return created.id;
    const {username, password, name, email, url} = user;
    return db.execute('insert into users (username, password, name, email, url) values (?,?,?,?,?)', [username, password, name, email, url])
    .then((result)=> console.log(result[0].insertId));
}

export async function findById(id){
    // return users.find((user)=> user.id === id)
    return db.execute("SELECT id from users WHERE id =?",[id])
    .then((result)=> result[0][0]);
}

