import {Injector, Injectable, EventEmitter} from 'angular2/core';
import {Modal, NavController, NavParams} from 'ionic-angular';

import {LoginPage} from './login/login';

@Injectable()
export class AuthService {
    private _username:string;

    constructor(private injector:Injector) {}

    getUsername():Promise<string> {
        return new Promise((resolve:Function, reject:Function) => {
            if (this._username) {
                resolve(this._username);
            } else {
                // Get NavController
                var nav:NavController = this.injector.get(NavController);
                // Show login screen and return result when login will happens
                // let this.injector.get(LoginPage)
                let profileModal = Modal.create(LoginPage, { user: {} });
                nav.present(profileModal).then((value: any) => {
                    console.log(value);
                }, (error) => {
                    console.log(error);
                });
            }
        });
    }


}
