import * as userRepository from './auth.js';

let tweets = [
    {
        id: '1',
        text: '첫 트윗입니다!!',
        createAt: Date.now().toString(),
        userId : '1'
    },
    {
        id: '2',
        text: '안녕하세요!',
        createAt: Date.now().toString(),
        userId : '1'
    }

];


export async function getAll() {
    return Promise.all(
        tweets.map(async (tweet) => {
            const {username, name, url} = await userRepository.findById(tweet.userId);
            return {...tweet, username, name, url};
        })
    )
}

export async function getAllByUsername(username) {
    return getAll().then((tweets) => tweets.filter((tweet)=> tweet.username ===username))
};

export async function getById(id) {
    const found = tweets.find((tweet) => tweet.id === id);
    if(!found){
        return null;
    }
    const {username, name, url} = await userRepository.findById(found.userId);
    return {...found, username, name, url};
}

export async function create(text, userId) {
    const tweet = {
        id: Date.now().toString(),
        text, // key와 value가 동일하면 생략가능
        createdAt: new Date(),
        userId
    };
    tweets = [tweet, ...tweets]; // 배열을 복사를해서 추가하기
    return getById(tweet.id);
}

export async function update(id, text) {
    const tweet = tweets.find((tweet) => tweet.id === id)
    if (tweet) {
        tweet.text = text;
    }
    return tweet
}

export async function remove(id) {
    tweets = tweets.filter((tweet) => tweet.id !== id) // id로 설정한것 빼고 나머지를 선택한다
    return tweets
}

