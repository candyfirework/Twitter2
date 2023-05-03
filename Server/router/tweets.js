import express from 'express';
import * as tweetController from '../controller/tweet.js'
import { body, param, validationResult } from 'express-validator';
import { validate } from '../middleware/validator.js';

const router = express.Router();


//중간에 직접 코드를 넣엇을시에
// const validate = (req, res, next) => {
//     // validattionResult => error 값을 생성
//     const errors = validationResult(req);
//     if (errors.isEmpty()) {
//         return next();
//     }
//     return res.status(400).json({ message: errors.array() })
// }

//이것도 함수화
const validateTweet = [
    body('text')
        .trim()
        .isLength({ min: 4 })
        .withMessage('text는 최소 4자이상 입력하세요!'),
    validate
]


// GET
// /tweets?username=:username  각각(key, value)
router.get('/', tweetController.getTweets);

// GET
// /tweets/:id

router.get('/:id', tweetController.getTweet);

//text 가 4자 이하인 경우 에러처리 (POST, PUT)

//POST
// id : Date.now().toString()
// POST는 데이터를 추가 할때 많이 사용한다.
router.post('/',
    validateTweet,
    tweetController.createTweet);

// 중간에 넣는방법
//     body('text').trim().isLength({ min: 4 }).withMessage('4글자 이상으로 입력하세요!'),
//     validate
// ],

//PUT
// text만 수정
router.put('/:id',
    validateTweet,
    tweetController.updateTweet);


// 중간에 넣는방법
// [
//     body('text').trim().isLength({ min: 4 }).withMessage('4글자 이상으로 입력하세요!'),
//     validate
// ], 


//DELETE
router.delete('/:id', tweetController.deleteTweet);



export default router;



