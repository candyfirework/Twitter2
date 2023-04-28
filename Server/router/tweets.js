import express from 'express';
import * as tweetController from '../controller/tweet.js'
const router = express.Router();



// GET
// /tweets?username=:username  각각(key, value)
router.get('/', tweetController.getTweets);

// GET
// /tweets/:id

router.get('/:id', tweetController.getTweet);

//POST
// id : Date.now().toString()
// POST는 데이터를 추가 할때 많이 사용한다.
router.post('/',tweetController.createTweet);

//PUT
// text만 수정
router.put('/:id',tweetController.updateTweet);

//DELETE
router.delete('/:id',tweetController.deleteTweet);



export default router;



