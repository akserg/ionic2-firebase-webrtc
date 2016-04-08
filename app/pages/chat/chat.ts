import {Page, Modal, NavController} from 'ionic-angular';
import {Inject} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {UserService} from '../../common/user.service';
import {User, AuthService} from '../../common/auth.service';

@Page({
  templateUrl: 'build/pages/chat/chat.html'
})
export class ChatPage {

    user:User = {};
    otherUsername: string = '';

    constructor(private userService:UserService, private authService:AuthService) {
        this.user = authService.user;
    }


    startCall() {
        console.log('Call to ', this.otherUsername);
    }
}
