
import * as userRepository from './auth.js';
import { useVirtualId } from '../db/database.js';
import Mongoose from 'mongoose';
//import { getTweets } from '../db/database.js'

const tweetSchema = new Mongoose.Schema({
    text: { type: String, required: true},
    userid: { type: String, required: true},
    name: { type: String, required: true},
    username: { type: String, required: true},
    url:String
},
{timestamps: true}
)

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);


// sequelize 버젼
// const Tweet = sequelize.define(
//     'tweet',
//     {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             allowNull: false,
//             primaryKey: true
//         },
//         text: {
//             type: DataTypes.TEXT,
//             allowNull: false,
//         },

//     }
// )
// 조인하는 함수
// Tweet.belongsTo(User);
// const INCLUDE_USER = {
//     attributes: [
//         'id',
//         'text',
//         'createdAt',
//         'userId',
//         // 밑에 데이터는 user테이블에서 가져온것, 특정 컬럼들을 꺼내서 같은레벨의 객체로 리턴
//         [Sequelize.col('user.name'), 'name'],
//         [Sequelize.col('user.username'), 'username'],
//         [Sequelize.col('user.url'), 'url'],
//     ],
//     //inclued -> 속성주기  -> User 태이블까지 한번에 검색한다.
//     include: {
//         model: User,
//         attributes: [],
//     }
// }


const ODER_DESC = {
    order: [['created', 'DESC']]
}

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

// 일반 DB 버젼
// SELECT join 구문을 만들어놓음
const SELECT_JOIN = 'select tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw left outer join users as us on tw.userId = us.id';

// 내림차순 구문
const ORDER_DESC = 'order by tw.createdAt desc';


export async function getAll() {
    return Tweet.find().sort({createdAt: -1});
    //  DB 연결전
    // return Promise.all(
    //     tweets.map(async (tweet) => {
    //         const {username, name, url} = await userRepository.findById(tweet.userId);
    //         return {...tweet, username, name, url};
    //     })
    // )

    // DB 연결후
    // return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`)
    //     .then((result) => result[0]);

    // sequelize 변환후
    // return Tweet.findAll({ ...INCLUDE_USER, ...ORDER_DESC })
    //     .then((data) => {
    //         console.log(data)
    //         return data;
    //     });

    //mongoDb 
    //return getTweets()
    //    .find()
    //    .sort({ createdAt: -1 })
    //    .toArray()
    //    .then(maptweets);
}



export async function getAllByUsername(username) {
    return Tweet.find ({username}).sort({ createdAt: -1});
    //  DB 연결전
    // return getAll().then((tweets) => tweets.filter((tweet)=> tweet.username ===username))

    // DB 연결후
    // return db.execute(`${SELECT_JOIN} where us.username =? ${ORDER_DESC}`, [username])
    //     .then((result) => result[0]);

    // sequelize 변환후
    // return Tweet.findAll(
    //     {
    //         ...INCLUDE_USER,
    //         ...ORDER_DESC,
    //         include: {
    //             ...INCLUDE_USER.include,
    //             where: { username }
    //         }

    //     });

    //mongoDb 
    //return getTweets()
    //    .find({ username })
    //    .sort({ createdAt: -1 })
    //    .toArray()
    //    .then(maptweets)
}

export async function getById(id) {
    return Tweet.findById(id);
    //  DB 연결전
    // const found = tweets.find((tweet) => tweet.id === id);
    // if(!found){
    //     return null;
    // }
    // const {username, name, url} = await userRepository.findById(found.userId);
    // return {...found, username, name, url};

    // DB 연결후
    // return db.execute(`${SELECT_JOIN} where tw.id =?`, [id])
    //     .then((result) => result[0][0]);

    // sequelize 변환후
    // return Tweet.findOne({
    //     // id를 찾는데 INCLUDE_USER 에서 찾기
    //     where: { id },
    //     ...INCLUDE_USER
    // })

    //mongoDb  
    //return getTweets()
    //    .find({ _id: new ObjectID(id)})
    //    .sort({ createdAt: -1 })
    //    .next()
    //    .then(mapOptionalTweet)
}


export async function create(text, userId) {
    return userRepository.findById(userId)
    .then((user) => new Tweet({
        text,
        userId,
        name: user.name,
        username: user.username
    }).save()
    );
    //  DB 연결전
    // const tweet = {
    //     id: Date.now().toString(),
    //     text, // key와 value가 동일하면 생략가능
    //     createdAt: new Date(),
    //     userId
    // };
    // tweets = [tweet, ...tweets]; // 배열을 복사를해서 추가하기
    // return getById(tweet.id);

    // DB 연결후
    // return db.execute('insert into tweets (text, createdAt, userId) values (?,?,?)', [text, new Date(), userId])
    //     .then((result) => console.log(result));

    // sequelize 변환후
    // return Tweet.create({ text, userId })
    //     .then((data) => {
    //         console.log(data);
    //         return data;
    //     })

    //mongoDb     
    //return userRepository.findById(userId)
    //    .then((user) => getTweets().insertOne({
    //        text,
    //        createdAt: new Date(),
    //        userId,
    //        name: user.name,
    //        username: user.username,
    //        url: user.url
    //    }))
    //    .then((result) => console.log(result))
    //    .then(mapOptionalTweet)
}

export async function update(id, text) {
    return Tweet.findOneAndUpdate(id, {text},{returnOriginal: false});

    //  DB 연결전
    // const tweet = tweets.find((tweet) => tweet.id === id)
    // if (tweet) {
    //     tweet.text = text;
    // }
    // return tweet

    // DB 연결후
    // return db.execute('update tweets set text = ? where id = ?', [text, id])
    //     .then(() => getById(id))

    // sequelize 변환후
    // return Tweet.findByPk(id, INCLUDE_USER)
    //     .then((tweet) => {
    //         tweet.text = text;
    //         return tweet.save()
    //     })

    //mongoDb     
    //return getTweets().findOneAndUpdate(
    //    {_id: new ObjectID(id) },
    //    { $set: { text }},
    //    { returnOriginal: false }
    //)
    //.then((res) => res.value)
    //.then(mapOptionalTweet);
}


export async function remove(id) {
    return getTweets().deleteOne({ _id: new ObjectID(id) })
    return Tweet.findByIdAndDelete(id);
}
    //  DB 연결전
    // tweets = tweets.filter((tweet) => tweet.id !== id) // id로 설정한것 빼고 나머지를 선택한다
    // return tweets

    // DB 연결후
    // return db.execute('delete from tweets where id=?', [id]);

    // sequelize 변환후
    // return Tweet.findByPk(id, INCLUDE_USER)
    // .then((tweet) => {
    //     tweet.destroy()
    // });

    //mongoDb 
    //return getTweets().deleteOne({ _id: new ObjectID(id) })


//function mapOptionalTweet(tweet) {
//    // tweet 존재하면 복사해서 id에 tweet의 아이디를 스트링 형태로 넣는다.
//    return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
//};
//
//function maptweets(tweets) {
//    return tweets.map(mapOptionalTweet)
//}


