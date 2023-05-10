export default class TweetService {
    // tweets = [
  //   {
  //     id: 1,
  //     text: '첫번째 트윗이예요!',
  //     createdAt: '2022-05-09T04:20:57.000Z',
  //     name: 'apple',
  //     username: '김사과',
  //     url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  //   },
  // ];

  // 네트워크를 통해 데이터 가져오기
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getTweets(username) {
    // 네트워크 연결 후 fetch를 통해 /tweets?username=:username
    // fetch 를 통해 /tweets?username=:username 형식으로 return 시켜주기
    //있으면 username , 없으면 '' return
    const query = username ? `?username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, { //username이 apple이라면 ?username=apple, 없으면 ?username
      method: 'GET',
      headers: this.getHeaders(),
    });
  }

  
  // fetch 를 통해 /tweets post로 입력한 데이터 전송
  async postTweet(text) {
        // console.log('post 방식')
    // const tweet = {
    //   id: Date.now(),
    //   createdAt: new Date(),
    //   name: 'apple',
    //   username: '김사과',
    //   text,
    // };
    // this.tweets.push(tweet);
    // return tweet;
    return this.http.fetch(`/tweets`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ text, username: 'apple', name: '김사과' }),
    });
  }

  async deleteTweet(tweetId) {
     // const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    // if (!tweet) {
    //   throw new Error('tweet not found!');
    // }
    // tweet.text = text;
    // return tweet;
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  onSync(callback) {
    return this.socket.onSync('tweets', callback);
  }
}
