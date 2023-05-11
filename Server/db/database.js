import mysql from 'mysql2';
import {config} from '../config.js';
import SQ from 'sequelize';

const {host, user, database, password} = config.db;



// const pool = mysql.createPool({
//     // host: config.db.host,
//     // user: config.db.user,
//     // database: config.db.database,
//     // password: config.db.password 
//     // 위에 const 조작으로 밑처럼 변환하기 가능
//     host,
//     user,
//     database,
//     password
// })

// Sequelize(디비, 유저, 패스워드,{넣을곳})
export const sequelize = new SQ.Sequelize(database, user, password, {
    host,
    // db 종류
    dialect: 'mysql',
    //로그 남기지 않기
    logging: false,
    timezone: "+9:00"
})




// export const db = pool.promise()


