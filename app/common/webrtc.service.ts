import {Injectable, EventEmitter} from 'angular2/core';

@Injectable()
export class WebRTCService {
    peer: PeerJs.Peer;
    conn: PeerJs.DataConnection;
    data: EventEmitter<any> = new EventEmitter<any>();
    userId: string = '1';
    
    init(userId: string) {
        // Get our id come from Firebase
        this.userId = userId;
        // Create the Peer object where we create and receive connections.
        this.peer = new Peer(this.userId, {key: 'whbzng0p4kq8semi'});
        // Open connection to another Peer
        this.peer.on('open', (id: string) => {
            // Every Peer object is assigned a random, unique ID when it's created.
            console.log('My peer ID is: ' + id);
            
            // Receive messages
            this.conn.on('data', (msgData: any) => {
                console.log('Received', msgData);
                this.data.emit(msgData);
            });
        });
    }
    
    connect(otherUserId: string) {
        this.conn = this.peer.connect(otherUserId);
    }
    
    send(message: string) {
        this.conn.send(message);
    }
    
    mediaCall(otherUserId: string) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        navigator.getUserMedia({video: true, audio: true}, (stream: any) => {
            var call = this.peer.call(otherUserId, stream);
            call.on('stream', (remoteStream: any) => {
                // Show stream in some <video> element.
            });
        }, (error) => {
            console.log('Failed to get local stream', error);
        });
    }
    
    mediaAnswer() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        this.peer.on('call', (peerCall) => {
            navigator.getUserMedia({video: true, audio: true}, (stream: any) => {
                peerCall.answer(stream); // Answer the call with an A/V stream.
                peerCall.on('stream', (remoteStream: any) => {
                    // Show stream in some <video> element.
                });
            }, function(error) {
                console.log('Failed to get local stream', error);
            });
        });
    }
}