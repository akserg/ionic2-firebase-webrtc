import {Page, Platform} from 'ionic-angular';
import {OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

import {AuthService} from '../../common/auth.service';

@Page({
  templateUrl: 'build/pages/chat/chat.html'
})
export class ChatPage implements OnInit {

    username:string = '';
    users: FirebaseListObservable<any[]>;

    constructor(private platform: Platform, private af: AngularFire, private auth: AuthService){
        this.users = this.af.list('/users');
    }

    ngOnInit(): any {
        this.auth.getUsername().then((value: string) => {
            this.username = value;
        }, (error) => {
            console.log(error);
        });
    }

    // join(task : HTMLInputElement): void {

    //     console.log(`Adding user to users in chat room: ${task.value} `);
    //     this.users.add(task.value);
    // }

    // leave(id){
    //     this.users.remove(id);
    // }



}
