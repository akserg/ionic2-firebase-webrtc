import {Injectable} from 'angular2/core';

@Injectable()
export class WebRTCConfig {

    peerServerPort: number = 9000;

    key:string = 'whbzng0p4kq8semi';

    stun: string = 'stun.l.google.com:19302';
    turn: string = 'homeo@turn.bistri.com:80';
    turnCredentials: string = 'homeo';

    stunServer:RTCIceServer = {
        urls: 'stun:' + this.stun
    };

    turnServer: RTCIceServer = {
        urls: 'turn:' + this.turn,
        credential: this.turnCredentials
    };

    getPeerJSOption(): PeerJs.PeerJSOption {
        return {
            // Set API key for cloud server (you don't need this if you're running your own.
            key: this.key,

            // Set highest debug level (log everything!).
            debug: 3,

            secure: true,

            config: {
                iceServers: [
                    this.stunServer,
                    this.turnServer
                ]
            }
        };
    }

    /**********************/

    audio: boolean = true;
    video: boolean = false;

    getMediaStreamConstraints(): MediaStreamConstraints {
        return <MediaStreamConstraints> {
            audio: this.audio,
            video: this.video
        }
    }
}
