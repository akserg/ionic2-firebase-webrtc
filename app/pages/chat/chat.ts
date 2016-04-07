import {Page, Modal, NavController} from 'ionic-angular';
import {FORM_DIRECTIVES} from 'angular2/common';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../../common/auth.service';
import {LoginPage} from '../login/login';

@Page({
  templateUrl: 'build/pages/chat/chat.html'
})
export class ChatPage {

    username:string = '';
    users: FirebaseListObservable<any[]>;

    constructor(private af: AngularFire, private auth: AuthService, private nav:NavController){
        this.users = this.af.list('/users');
    }

    onPageWillEnter() {
        this.auth.getUsername().then((value: string) => {
            this.username = value;
        }, (error) => {
            console.log(error);
            let loginPage: Modal = Modal.create(LoginPage);
            loginPage.onDismiss((value: string) => {
                this.username = value;
                this.auth.setUsername(value);
            });
            this.nav.present(loginPage);
        });
    }
}
