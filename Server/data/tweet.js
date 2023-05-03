let tweets = [
    {
        id: '1',
        text: '첫 트윗입니다!!',
        createAt: Date.now().toString(),
        name: 'apple',
        username: '김사과',
        url: ''
    },
    {
        id: '2',
        text: '안녕하세요!',
        createAt: Date.now().toString(),
        name: 'banana',
        username: '반하나',
        url: ''

    }

];


export async function getAll() {
    return tweets;
}

export async function getAllByUsername(username) {
    return tweets.filter((tweet) => tweet.username === username)
};

export async function geyByID(id) {
    return tweets.find((tweet) => tweet.id === id)
}

export async function create(text, name, username) {
    const tweet = {
        id: Date.now().toString(),
        text, // key와 value가 동일하면 생략가능
        name,
        username,
    };
    tweets = [tweet, ...tweets]; // 배열을 복사를해서 추가하기
    return tweets;
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