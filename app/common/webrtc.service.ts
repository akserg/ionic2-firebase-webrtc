import {Injectable, EventEmitter} from 'angular2/core';

import {Config} from './config';

@Injectable()
export class WebRTCService {
    peer: PeerJs.Peer;
    conn: PeerJs.DataConnection;
    data: EventEmitter<any> = new EventEmitter<any>();
    userId: string = '1';

    constructor(private config: Config) {}

    /**
     * Create the Peer with User Id and PeerJSOption
     */
    createPeer(userId: string) {
        // Get our id come from Firebase
        this.userId = userId;
        // Create the Peer object where we create and receive connections.
        this.peer = new Peer(this.userId, this.config.getPeerJSOption());
    }

    /**
     * Open connection
     */
    openConnection() {
        this.peer.on('open', (id: string) => {
            // Every Peer object is assigned a random, unique ID when it's created.
            console.log('My peer ID is: ' + id);

            // Receive messages
            this.conn.on('data', (msgData: any) => {
                console.log('Received', msgData);
                this.data.emit(msgData);
            });
        });

        this.peer.on('error', (error) => {
            console.log(error);
        });
    }

    /**
     * Connect to other user
     */
    connectTo(otherUserId: string) {
        this.conn = this.peer.connect(otherUserId);
    }

    /**
     * Send text message to connected user
     */
    sendMessage(message: string) {
        this.conn.send(message);
    }

    /**
     * Make a media call (an audio or/and video) to other user
     */
    mediaCall(otherUserId: string, el:HTMLMediaElement) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia(this.config.getMediaStreamConstraints(), (stream: any) => {
            var call = this.peer.call(otherUserId, stream);
            call.on('stream', (remoteStream: any) => {
                // Show stream in some audio/video element.
                el.src = URL.createObjectURL(remoteStream);
            });
        }, (error) => {
            console.log('Failed to get local stream', error);
        });
    }

    /**
     * Answer on media call (an audio or/and video) from other user
     */
    mediaAnswer(el:HTMLMediaElement) {
        this.peer.on('call', (peerCall) => {
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            navigator.getUserMedia(this.config.getMediaStreamConstraints(), (stream: any) => {
                peerCall.answer(stream); // Answer the call with an A/V stream.
                peerCall.on('stream', (remoteStream: any) => {
                    // Show stream in some audio/video element.
                el.src = URL.createObjectURL(remoteStream);
                });
            }, function(error) {
                console.log('Failed to get local stream', error);
            });
        });
    }
}