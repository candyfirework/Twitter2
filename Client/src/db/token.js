const TOKEN = 'token';

export default class TokenStroage{
    saveToken(token){
        // set
        localStorage.setItem(TOKEN,token);
    }
    
    getToken(token){
        return localStorage.getItem(TOKEN,token);
    }

    clearToken(token){
        localStorage.clear(TOKEN);
    }
}