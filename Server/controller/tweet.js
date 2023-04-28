import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
};

export async function getTweet(req, res, next) {
    const id = req.params.id;
    const tweet = await tweetRepository.geyByID(id);
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `tweet id(${id})not found` })
    }
}

export async function createTweet(req, res, next) {
    const { text, name, username } = req.body;
    // req.body에서 가져오기
    const tweet = await tweetRepository.create(text, name, username)
    res.status(201).json(tweet)

}

export async function updateTweet(req, res, next) {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(id, text);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `tweet id(${id})not found` })
    }
}

export async function deleteTweet(req, res, next) {
    const id = req.params.id
    tweets = tweetRepository.remove(id)
    res.sendStatus(204);
}

// id로 설정한것 빼고 나머지를 선택한다