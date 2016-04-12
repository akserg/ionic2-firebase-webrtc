import {Inject, Injectable} from 'angular2/core';
import {isPresent} from 'angular2/src/facade/lang';

import {FirebaseAuth, AuthProviders, FirebaseAuthState} from 'angularfire2';

export interface User {
    displayName?: string;
    email?: string;
    id?: string;
    profileImageUrl?: string;
}

export class OtherUser {
    constructor(public name: string = '', public id: string = '') {}

    notEmpty(): boolean {
        return isPresent(this.name) && isPresent(this.id) && this.name.length > 0 && this.id.length > 0;
    }
}

@Injectable()
export class AuthService {

    private _user: User;

    public get user(): User {
        return this._user;
    }

    otherUser: OtherUser;

    constructor(@Inject(FirebaseAuth) private auth: FirebaseAuth) { }

    login(): Promise<any> {
        return this.auth.login({
            provider: AuthProviders.Google
        }).then((value: FirebaseAuthState) => {
            console.log(value);
            this._user = <User>value.google;
            return this._user;
        });
    }

}
