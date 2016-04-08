import {Inject, Injectable} from 'angular2/core';

import {FirebaseAuth, AuthProviders, FirebaseAuthState} from 'angularfire2';

export interface User {
    displayName?: string;
    email?: string;
    id?: string;
    profileImageUrl?: string;
}

@Injectable()
export class AuthService {

    private _user: User;

    public get user(): User {
        return this._user;
    }

    constructor(@Inject(FirebaseAuth) private auth: FirebaseAuth) { }

    login(): Promise<void> {
        return this.auth.login({
            provider: AuthProviders.Google
        }).then((value: FirebaseAuthState) => {
            console.log(value);
            this._user = <User>value.google;
        });
    }

}
