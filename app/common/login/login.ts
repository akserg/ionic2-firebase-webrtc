import {Page, Platform} from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

@Page({
  templateUrl: 'build/common/login/login.html'
})
export class LoginPage {

    username:string = '';
    users: FirebaseListObservable<any[]>;

    constructor(private platform: Platform, private af: AngularFire){
        this.users = this.af.list('/users');
    }

    login(): void {

        console.log(`Adding user to users in chat room: ${this.username} `);
        this.users.add(this.username).then((value: any) => {
            console.log('Success:' + value);
        }, (error) => {
            console.log('Error:' + error);
        });
    }
}
