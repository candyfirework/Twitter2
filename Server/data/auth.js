// import {db} from '../db/database.js';
import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

// 데이터 타입 결정하기
const DataTypes = SQ.DataTypes

//user 라고 만들면 users 라고 만듬 무조건 s를 붙임, 만약 users가 있다면 만드는게 아니라 그 테이블을 가르키게 된다.

export const User = sequelize.define(
    'user',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
        },
        url: {
            type: DataTypes.TEXT(),
            allowNull: true
        },
        // regdate : 날짜타입, 현재시간을 자동 등록
        regdate: {
            type: DataTypes.DATE(),
            defaultValue: DataTypes.NOW
        }
    },
    { timestamps: false }
)


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
    return User.findOne({ where: { username } })
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
    return User.create(user).then((data) => data.dataValues.id);
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
    return User.findByPk(id);
}

