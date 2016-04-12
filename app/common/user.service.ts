import {Inject, Injectable} from 'angular2/core';

import {AngularFire, FirebaseRef, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

@Injectable()
export class UserService {

    static USERS: string = 'users';

   constructor(private angularFire: AngularFire, @Inject(FirebaseRef) private ref: Firebase) {}

    asList(): FirebaseListObservable<any> {
        return this.angularFire.list(UserService.USERS);
    }

    asObject(userId: string): FirebaseObjectObservable<any> {
        return this.angularFire.object(UserService.USERS + '/' + userId);
    }

    exists(userId: string): Promise<boolean> {
        let usersRef: Firebase = this.ref.child(UserService.USERS);
        return new Promise<boolean>((resolve, fault) => {
            usersRef.child(userId).once('value', (snapshot: FirebaseDataSnapshot) => {
                let exists:boolean = (snapshot.val() !== null);
                resolve(exists);
            });
        });
    }

    create(userId: string, userName: string): Promise<void> {
        // Get reference on 'Users'
        let userRef: Firebase = this.ref.child(UserService.USERS + '/' + userId);
        // Set username
        return userRef.set(userName);
    }

    // create(user: any): Promise<void> {
    //     // Get reference on 'Users'
    //     let usersRef: Firebase = this.ref.child(UserService.USERS);
    //     // Create new child via 'push' method to get an id
    //     let userRef: Firebase = usersRef.push();
    //     // Now set user info and save it
    //     return userRef.set(user);
    // }

    remove(userId: string): Promise<void> {
        // Get a reference on User
        let userRef: Firebase = this.ref.child(UserService.USERS + '/' + userId);
        // Remove it in Firebase
        return userRef.remove();
    }
}
