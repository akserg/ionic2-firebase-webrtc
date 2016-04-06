import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';

import {WebRTCService} from './common/webrtc.service';

import {HomePage} from './pages/home/home';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers : [FIREBASE_PROVIDERS, defaultFirebase('https://ng2-webrtc.firebaseio.com/'), WebRTCService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/  
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, webRTC:WebRTCService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //
      webRTC.init('123');
    });
  }
}
