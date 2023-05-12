import MongoDb from 'mongodb';
import { getTweets } from '../db/database.js';
import* as UserRepository from './auth.js';
// const DataTypes = SQ.DataTypes;

const ObjectID = MongoDb.ObjectId;
/*const Tweet = sequelize.define(
    'tweet',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
);
Tweet.belongsTo(User);
const INCLUDE_USER = {
    attributes: [
        'id',
        'text',
        'createdAt',
        'userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url']
    ],
    include: {
        model: User,
        attributes: []
    }
}
const ORDER_DESC = {
    order: [['createdAt', 'DESC']]
}*/
export async function getAll() {
    return getTweets()
    .find()
    .sort({createdAt: -1})
    .toArray()
    .then(mapTweets);
}
export async function getAllByUsername(username) {
    return getTweets()
    .find({username})
    .sort({createdAt: -1})
    .toArry()
    .then(mapTweets);
    // return getAll().then((tweets) => tweets.filter((tweet) => tweet.username === username));
}
export async function getById(id) {
    return getTweets()
    .find({_id: new ObjectID(id)})
    .next()
    .then=(mapOptionalTweet);
}
export async function create(text, userId) {
    return UserRepository.findById(userId)
    .then((user)=> getTweets().insertOne({
        text,
        createdAt: new Date(),
        userId,
        name: user.name,
        username: user.username,
        url: user.url
    })) .then((result) => console.log(result)).then(mapOptionalTweet);
}
export async function update(id, text) {
    return getTweets().findOneAndUpdate(
        {_id: new ObjectID(id)},
        { $set: { text} },
        { returnOriginal:false}
    )
        .then((result)=> result.value)
        .then(mapOptionalTweet);
    }

export async function remove(id) {
    return getTweets().deleteOne({_id: new ObjectID(id)});
}

function mapOptionalTweet(tweet) {
    return tweet ? {...tweet, id: tweet._id.toString() } : tweet;
}
function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}

