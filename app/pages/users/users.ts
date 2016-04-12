import {Page, ViewController, NavController} from 'ionic-angular';
import {COMMON_DIRECTIVES} from 'angular2/common';

import {AngularFire, FirebaseRef, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';

import {UserService} from '../../common/user.service';
import {User, OtherUser, AuthService} from '../../common/auth.service';

@Page({
    templateUrl: 'build/pages/users/users.html',
    directives: [COMMON_DIRECTIVES]
})
export class UsersPage {

    me: User;
    users: FirebaseListObservable<any>;

    constructor(private userService: UserService, private authService: AuthService,
        private viewCtrl: ViewController) {
        this.me = authService.user;
        this.users = userService.asList();
    }

    chooseUser(user: any) {
        console.log('Choose user', user);
        this.viewCtrl.dismiss(new OtherUser(user.$value, user.$key));
    }
}
