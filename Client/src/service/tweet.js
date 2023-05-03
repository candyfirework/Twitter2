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
  constructor(http){
    this.http = http;
  }

  async getTweets(username) {
    // return username
    // ? this.tweets.filter((tweet) => tweet.username === username)
    // : this.tweets;
    // fetch 를 통해 /tweets?username=:username 형식으로 return 시켜주기
    //있으면 username , 없으면 '' return
    console.log('h')
    const query = username ? `username=${username}` : '';
    return this.http.fetch(`/tweets${query}`, {
      method: 'GET'
    })
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
    console.log('post 방식!')
    return this.http.fetch(`/tweets`,{
      method : 'POST',
      body : JSON.stringify({text, username:'김사과', name:'apple'})
    })
  }

  async deleteTweet(tweetId) {
    // this.tweets = this.tweets.filter((tweet) => tweet.id !== tweetId);
    return this.http.fetch(`/tweets${tweetId}`,{
      method : 'DELETE'
    });
  }

  async updateTweet(tweetId, text) {
    // const tweet = this.tweets.find((tweet) => tweet.id === tweetId);
    // if (!tweet) {
    //   throw new Error('tweet not found!');
    // }
    // tweet.text = text;
    // return tweet;
    return this.http.fetch(`/tweets${tweetId}`,{
      method : 'UPDATE',
      body : JSON.stringify({text})
    })
  }
}
