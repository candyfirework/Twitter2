/*
    회원가입  -> post, /signup 일때 표시
    name  : 빈문자 X(notEmpty())
    email : 이메일 형식 체크, 모두 소문자로 변경
    url   : url 체크(isURL())

    로그인 -> post, /login
    username : 공백X, 빈문자X
    password : 공백X, 최소4자이상
*/


/* 내가 짠 코드

import { body, param, validationResult } from 'express-validator';
import express from 'express';

const validate = (req, res, next) => {
    // validattionResult => error 값을 생성
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return res.status(400).json({ message: errors.array() })
}
const app = express();
app.use(express.json());

app.post(
    '/auth/signup',
    [
        body('name').notEmpty().withMessage('이름은 빈문자열은 불가합니다'),
        body('email').isEmail().withMessage('이메일 형식을 확인하삼').normalizeEmail(),
        body('url').isURL().withMessage('Url 형식을 지켜주세요'),
        validate
    ],
    (req, res) => {
        console.log(req.body);
        res.sendStatus(201);
    }
);
app.post(
    '/auth/login',
    [

        body('username').trim().notEmpty().withMessage('아이디는 공백과 빈문자가 없어야 합니다'),
        body('password').trim().isLength({min:4}).withMessage('비밀번호는 공백과 최소4자 이상이어야 합니다'),
        validate
    ],
    (req, res) => {
        console.log(req.body);
        res.sendStatus(201);
    }
);
app.listen(8080);

*/

//강사님 코드

import express from 'express';
import {body} from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authjController from '../controller/auth.js';
import {isAuth} from '../middleware/auth.js';

const router = express.Router();

const validateCredential =[
    body('username')
        .trim()
        .notEmpty()
        .isLength({min:5})
        .withMessage("아이디는 최소 4자입력"),
    body('password')
        .trim()
        .isLength({min:4})
        .withMessage("비밀번호는 최소 4자이상 입력하세요"),
    validate
]

const validateSignup = [
    // 위에것 복사해오기
    ...validateCredential,
    body('name').notEmpty().withMessage("이름을 꼭입력하세용"),
    body('email').isEmail().normalizeEmail().withMessage("이메일 형식을 지켜주세요"),
    body('url').isURL().withMessage("Url을 입력하세요")
    // 비어도됨, checkFalsy -> falsy로 된 값은 true 나머지는 전부 false로 처리함
    .optional({nullable: true, checkFalsy: true}),
    validate
]


router.post('/signup',validateSignup, authjController.signup)

router.post('/login',validateCredential, authjController.login)

router.get('/me',isAuth,authjController.me)  

export default router;

