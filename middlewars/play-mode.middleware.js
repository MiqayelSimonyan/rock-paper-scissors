export default class PlayModeMiddleware {   
    static setPlayMode(name, token) {
        localStorage.setItem(name, token);
    }

    static isPlayModeChosen(name) {
        return localStorage.getItem(name) !== null;   
    }

    static DeletePlayMode(name) {
        localStorage.removeItem(name);
    }

    static getPlayMode(name) {
        return localStorage.getItem(name);
    }    
}