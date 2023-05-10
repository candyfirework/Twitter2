import * as userRepository from './auth.js';
import {db} from '../db/database.js';

// DB 연결시 필요없음.
// let tweets = [
//     {
//         id: '1',
//         text: '첫 트윗입니다!!',
//         createAt: Date.now().toString(),
//         userId : '1'
//     },
//     {
//         id: '2',
//         text: '안녕하세요!',
//         createAt: Date.now().toString(),
//         userId : '1'
//     }

// ];

// SELECT join 구문을 만들어놓음
const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw left outer join users as us on tw.userId = us.id';

// 내림차순 구문
const ORDER_DESC = 'order by tw.createdAt desc';


export async function getAll() {
    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const {username, name, url} = await userRepository.findById(tweet.userId);
    //         return {...tweet, username, name, url};
    //     })
    // )
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    .then((result)=> result[0]);
}

export async function getAllByUsername(username) {
    // return getAll().then((tweets) => tweets.filter((tweet)=> tweet.username ===username))
    return db.execute(`${SELECT_JOIN} where us.username =? ${ORDER_DESC}`,[username])
    .then((result)=> result[0]);
};

export async function getById(id) {
    // const found = tweets.find((tweet) => tweet.id === id);
    // if(!found){
    //     return null;
    // }
    // const {username, name, url} = await userRepository.findById(found.userId);
    // return {...found, username, name, url};

    return db.execute(`${SELECT_JOIN} where tw.id =?`,[id])
    .then((result)=> result[0][0]);
}


export async function create(text, userId) {
    // const tweet = {
    //     id: Date.now().toString(),
    //     text, // key와 value가 동일하면 생략가능
    //     createdAt: new Date(),
    //     userId
    // };
    // tweets = [tweet, ...tweets]; // 배열을 복사를해서 추가하기
    // return getById(tweet.id);
    //DB사용
    return db.execute('insert into tweets (text, createdAt, userId) values (?,?,?)',[text,new Date(), userId])
    .then((result) => console.log(result));
}

export async function update(id, text) {
    // const tweet = tweets.find((tweet) => tweet.id === id)
    // if (tweet) {
    //     tweet.text = text;
    // }
    // return tweet
    return db.execute('update tweets set text = ? where id = ?',[text,id])
    .then(()=> getById(id))
}

export async function remove(id) {
    // tweets = tweets.filter((tweet) => tweet.id !== id) // id로 설정한것 빼고 나머지를 선택한다
    // return tweets
    return db.execute ('delete from tweets where id=?',[id]);
}



