import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import TweetService from './service/tweet';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
// 추가된 import
import HttpClient from './network/http.js';
import TokenStroage from './db/token.js';

// .env에서 읽어옴 : http://localhost:8080
const baseURL = process.env.REACT_APP_BASE_URL;
// 추가된 변수
const httpClient = new HttpClient(baseURL)
const tokenStroage = new TokenStroage();

const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService(httpClient, tokenStroage);
// Tweetservice 경로를 변경해줌
const tweetService = new TweetService(httpClient, tokenStroage);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
