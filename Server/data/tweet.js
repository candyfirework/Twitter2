import  * as userRepository from './auth.js'; // 0508
let tweets = [
    {
    id:'1',
    text:'첫 트윗입니다!!',
    createdAt: Date.now().toString(),
    userId: '1' // 0508
    },
    {
        id:'2',
        text:'안녕하세요!!',
        createdAt: Date.now().toString(),
        userId: '1' // 0508
    }
];
export async function getAll(){ // 0508
    return Promise.all(
    tweets.map(async (tweet) => {
        const{username, name, url} = await userRepository.findById(tweet.userId);
        return {...tweet, username, name, url};
    })
    )
}
export async function getAllByUsername(username){ // 0508
    return getAll().then((tweets)=>tweets.filter((tweet) => tweet.username === username));
}

export async function getById(id){ // 0508
    const found = tweets.find((tweet)=>tweet.id === id);
    if(!found){
        return null;
    }
    const {username, name, url} = await userRepository.findById(found.userId);
    return {...found, username, name, url};
}
export async function create(text,userId){ // 0508
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        userId
    };
    tweets = [tweet, ... tweets];
    return getById(tweet.id);
}
export async function update(id,text){
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        tweet.text = text;
    }
    return tweet
}
export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !== id);
}