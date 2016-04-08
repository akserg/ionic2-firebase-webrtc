import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HomePage} from './pages/home/home';
import {TabsPage} from './pages/tabs/tabs';

import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods} from 'angularfire2';

import {UserService} from './common/user.service';
import {AuthService} from './common/auth.service';
import {WebRTCConfig} from './common/webrtc.config';
import {WebRTCService} from './common/webrtc.service';

@App({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
    providers: [
        FIREBASE_PROVIDERS,
        defaultFirebase('https://ng2-webrtc.firebaseio.com/'),
        firebaseAuthConfig({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
            remember: 'default',
            scope: ['email']
        }),
        WebRTCConfig, UserService, AuthService, WebRTCService],
})
export class MyApp {
    // We show the fake page here and will change it after success authorization
    rootPage: any = HomePage;

    constructor(platform: Platform, webRTC: WebRTCService, authService:AuthService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            //
            //   webRTC.init('123');
            // Let's sign in first
            authService.login().then(() => {
                // Now change the rootPage to tabs
                this.rootPage = TabsPage;
            });
        });
    }
}
