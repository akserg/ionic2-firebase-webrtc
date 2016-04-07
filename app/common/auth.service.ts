import {Injector, Injectable, EventEmitter} from 'angular2/core';

@Injectable()
export class AuthService {
    private _username:string;

    constructor() {}

    getUsername():Promise<string> {
        return new Promise((resolve:Function, reject:Function) => {
            if (this._username) {
                resolve(this._username);
            } else {
                reject('Please login');
            }
        });
    }
    
    setUsername(value: string) {
        this._username = value;
    }


}
