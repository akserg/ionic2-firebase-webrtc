import {Inject, Injectable} from 'angular2/core';

import {AngularFire, FirebaseRef, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class UserService {

    static USERS: string = 'users';

   constructor(private angularFire: AngularFire, @Inject(FirebaseRef) private ref: Firebase) {}

    asList(): FirebaseListObservable<any> {
        return this.angularFire.list(UserService.USERS);
    }

    asObject(key: string): FirebaseObjectObservable<any> {
        return this.angularFire.object(UserService.USERS + '/' + key);
    }

    create(user: JSON): Promise<void> {
        // Get reference on 'Users'
        let usersRef: Firebase = this.ref.child(UserService.USERS);
        // Create new child via 'push' method to get an id
        let userRef: Firebase = usersRef.push();
        // Now set user info and save it
        return userRef.set(user);
    }

    remove(key: string): Promise<void> {
        // Get a reference on User
        let userRef: Firebase = this.ref.child(UserService.USERS + '/' + key);
        // Remove it in Firebase
        return userRef.remove();
    }
}
