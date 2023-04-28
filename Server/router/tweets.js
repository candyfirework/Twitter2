import express from 'express';

let tweets = [
    {
        id:'1',
        text:'첫 트윗입니다!!',
        createAt: Date.now().toString(),
        name:'apple',
        username:'김사과',
        url:''
    },
    {
        id:'2',
        text:'안녕하세요!',
        createAt: Date.now().toString(),
        name:'banana',
        username:'반하나',
        url:''
        
    }

];

const router = express.Router();

// GET
// /tweets?username=:username  각각(key, value)
router.get('/', (req, res,next) => {
    const username  = req.query.username;
    const data = username
        ? tweets.filter((tweet) => tweet.username === username) 
        : tweets;  // 
    res.status(200).json(data);

});

// GET
// /tweets/:id

router.get('/:id', (req, res,next) => {
    const id = req.params.id;
    const tweet = tweets.find((tweet) =>tweet.id ===id)  
    if(tweet){
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message:`tweet id(${id})not found`})
    }
});

//POST
// id : Date.now().toString()
// POST는 데이터를 추가 할때 많이 사용한다.
router.post('/',(req, res, next) => {
    const {text, name, username} = req.body;
    // req.body에서 가져오기
    const tweet = {
        id : Date.now().toString(),
        text, // key와 value가 동일하면 생략가능
        name,
        username,
    };

    tweets = [tweet, ...tweets]; // 배열을 복사를해서 추가하기
    res.status(201).json(tweets);
});

//PUT
// text만 수정
router.put('/:id',(req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find((tweet) =>tweet.id ===id)

    if(tweet){
        tweet.text = text;
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message:`tweet id(${id})not found`})
    }
});

//DELETE
router.delete('/:id',(req, res, next) => {
    const id = req.params.id
    tweets = tweets.filter((tweet)=> tweet.id !== id) // id로 설정한것 빼고 나머지를 선택한다
    res.sendStatus(204);
});



export default router;



