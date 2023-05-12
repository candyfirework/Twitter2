// import {db} from '../db/database.js';
// import { sequelize } from '../db/database.js';
// import SQ from 'sequelize';

import {getUsers} from "../db/database.js";
import MongoDb from "mongodb";

// sequelize
// 데이터 타입 결정하기
// const DataTypes = SQ.DataTypes
// export const User = sequelize.define(
//     'user',
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true,
//         },
//         username: {
//             type: DataTypes.STRING(45),
//             allowNull: false
//         },
//         password: {
//             type: DataTypes.STRING(128),
//             allowNull: false
//         },
//         name: {
//             type: DataTypes.STRING(45),
//             allowNull: false
//         },
//         email: {
//             type: DataTypes.STRING(128),
//             allowNull: false,
//         },
//         url: {
//             type: DataTypes.TEXT(),
//             allowNull: true
//         },
//         // regdate : 날짜타입, 현재시간을 자동 등록
//         regdate: {
//             type: DataTypes.DATE(),
//             defaultValue: DataTypes.NOW
//         }
//     },
//     { timestamps: false }
// )





// Mongodb
// mongodb는 객체형식을 데이터를 저장한다. 데이터를 관리할때 특정 테이블이나 고유값이 없기 때문에 데이터를 관리하기위해 mongodb 는 ObjectID 라는 고유값이 있다.
const ObjectID = MongoDb.ObjectId;


//user 라고 만들면 users 라고 만듬 무조건 s를 붙임, 만약 users가 있다면 만드는게 아니라 그 테이블을 가르키게 된다.



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


export async function findByUsername(username) {
    // DB 연결전
    // return users.find((user)=> user.username === username)
    // result 에 [0][0] 은 id 번호를 인덱싱 한것이고 이것이 본래 id값과 비교하여 있으면 값을 반환하고 없다면 빈값을 반환한다.

    // DB 연결후
    // return db.execute("SELECT * from users WHERE username =?",[username])
    // .then((result)=> result[0][0]);

    // sequelize 변환후
    // where: {username:username} -> 생략 => username을 찾아주는 메소드 형식
    // return User.findOne({ where: { username } })

    // Mongodb 사용
    return getUsers().find({username})
    // 위에 거가 처리되면 다음으로 넘어가고 처리되지 않는다면 위에서 끝
    .next()
    .then(mapOptionalUser);
}

export async function createUser(user) {
    // DB 연결전
    // const created ={...user, id:Date.now().toString()};
    // users.push(created);
    // return created.id;

    // DB 연결후
    // const {username, password, name, email, url} = user;
    // return db.execute('insert into users (username, password, name, email, url) values (?,?,?,?,?)', [username, password, name, email, url])
    // .then((result)=> console.log(result[0].insertId));

    // sequelize 변환후
    // return User.create(user).then((data) => data.dataValues.id);

    // Mongodb 사용
    // insertOne => 하나만 넣기
    return getUsers().insertOne(user)
    .then((result)=>{ 
        console.log(result);
        // result.ops[0]._id.toString()
    });
}


export async function findById(id) {
    // DB 연결전
    // return users.find((user)=> user.id === id)

    // DB 연결후
    // return db.execute("SELECT id from users WHERE id =?",[id])
    // .then((result)=> result[0][0]);

    // sequelize 변환후
    // return User.findOne({where : {id}}) 이것도 가능
    // primary key 찾기
    // return User.findByPk(id);

    // Mongodb 사용
    return getUsers()
    .find({ _id: new ObjectID(id)})
    // 위에 거가 처리되면 다음으로 넘어가고 처리되지 않는다면 위에서 끝
    .next()
    .then(mapOptionalUser)
}

function mapOptionalUser(user){
    // user 가 이승면 id에 user 값을 string값을 전달한다.
    // _id -> ObejectId 를 말한다.
    return user ? {...user, id:user._id.toString()} :user;
}





