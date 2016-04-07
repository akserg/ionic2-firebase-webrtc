import {Page, Platform} from 'ionic-angular';

import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

import {WebRTCService} from '../../common/webrtc.service';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class MediaPage {

    users: FirebaseListObservable<any[]>;

    constructor(private platform: Platform, private af: AngularFire, private rtc:WebRTCService){
        this.users = this.af.list('/users');
    }

    join(task : HTMLInputElement): void {

        console.log(`Adding user to users in chat room: ${task.value} `);
        this.users.add(task.value);
    }

    leave(id){
        this.users.remove(id);
    }



}
