import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {HomePage} from './pages/home/home';
import {TabsPage} from './pages/tabs/tabs';

import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';

import {UserService} from './common/user.service';
import {AuthService, User} from './common/auth.service';
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

    constructor(platform: Platform, webRTC: WebRTCService, authService:AuthService, userService:UserService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            // Let's sign in first
            authService.login().then((user: User) => {
                // Chec is user exists
                userService.exists(user.id).then((value: boolean) => {
                    if (value) {
                        this._afterLogin(webRTC, user.id);
                    } else {
                        // Add user info
                        userService.create(user.id, user.displayName).then(() => {
                            this._afterLogin(webRTC, user.id);
                        }, (error) => {
                            console.log('Error', error);
                        });
                    }
                });
            });
        });
    }

    private _afterLogin(webRTC: WebRTCService, userId: string) {
        // Configure WebRTCConfig
        webRTC.createPeer(userId);
        // Now change the rootPage to tabs
        this.rootPage = TabsPage;
    }
}
