import {Page, Modal, NavController} from 'ionic-angular';

import {UsersPage} from '../users/users';

import {UserService} from '../../common/user.service';
import {User, OtherUser, AuthService} from '../../common/auth.service';
import {WebRTCService} from '../../common/webrtc.service';

@Page({
    templateUrl: 'build/pages/chat/chat.html'
})
export class ChatPage {

    me: User = {};
    otherUser: OtherUser = new OtherUser();

    constructor(private userService: UserService, private authService: AuthService, private webRTCService: WebRTCService,
        private nav: NavController) {
        this.me = authService.user;
    }

    getOtherUserName(): string {
        if (this.otherUser.notEmpty()) {
            return this.otherUser.name;
        } else {
            return 'Choose the User to call...';
        }
    }

    changeOtherUser() {
        console.log('Change user');
        let modal = Modal.create(UsersPage);
        modal.onDismiss((value: any) => {
            console.log('Selected user', value);
            this.otherUser = value;
        });
        this.nav.present(modal);
    }

    startCall() {
        console.log('Call to ', this.otherUser.id);
    }
}
