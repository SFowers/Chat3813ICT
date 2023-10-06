import { Component, OnInit } from '@angular/core';
import { SocketsService } from '../services/sockets.service';
import { AuthService } from '../services/auth.service';
import { GroupService } from '../services/group.service';

import { Message } from '../message';
import { Group } from '../group';
import { User } from '../user';

import { PeerService } from '../services/peer.service';
import { Peer } from 'peerjs';

interface VideoElement {
  muted: boolean;
  srcObject: MediaStream;
  userID: string;
}
const gdmOptions = {
  video: true,
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  }
}
const gumOptions = {
  audio: true,
  video: {
    width: { ideal: 640 },
    height: { ideal: 360 }
  }
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  messageContent:string = "";
  messageOut:string = "";
  messageIn:Message[] = <Message[]>[];
  //messages:string[] = [];

  rooms = [];
  chosenRoom:string = "";
  roomNotice:string = "";
  currentRoom:string = "";
  isInRoom:boolean = false;
  newRoom:string = "";
  numOfUsers:number = 0;

  currentUser = new User();

  ioConnection:any;

  isCallStarted = false;
  ownID = this.peerService.myPeerID;
  currentCall: any;
  peerList: string[] = [];
  currentStream: any;
  videos: VideoElement[] = [];
  calls: any = [];

  constructor(private socket:SocketsService,
              private auth:AuthService,
              private groupService:GroupService,
              private peerService:PeerService) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.getCurrentUser() || '{}');

    this.initIoConnection();
    this.socket.reqRoomList();
    this.socket.getRoomList((message:string) => { this.rooms = JSON.parse(message)});
    this.socket.getPeerID().subscribe((peerID: any) => {
      console.log('If a peer being ready to be called', 'Calling ${peerID}');
      if (peerID !== this.ownID) {
        this.peerList.push(peerID);
      }
    })
  }

  private initIoConnection() {
    this.socket.initSocket();
    this.socket.getMessage().subscribe((messages:any) => {
      this.messageIn.push(messages);
    })
    /*
    this.ioConnection = this.socket.getMessage()
      .subscribe((message:any) => {
        this.messages.push(message);
      });
    */
  }
  joinRoom() {
    console.log(this.chosenRoom);
    this.socket.joinRoom(this.chosenRoom);
    this.currentRoom = this.chosenRoom;
    this.isInRoom = true;
  }
  leaveRoom() {
    console.log(this.currentRoom);
    this.socket.leaveRoom(this.currentRoom);
    this.chosenRoom = "";
    this.currentRoom = "";
    this.isInRoom = false;
  }
  chat() {
    if(this.messageOut) {
      this.socket.sendMessage(this.messageOut);
      this.messageOut = "";
    } else {
      console.log("no message");
    }
  }

  addMyVideo(stream: MediaStream) {
    this.videos.push({
      muted: true,
      srcObject: stream,
      userID: this.peerService.myPeerID
    });
  }
  addOtherUserVideo(userID: string, stream: MediaStream) {
    let newVideo = {
      muted: false,
      srcObject: stream,
      userID
    };
    let existing = false;
    console.log(this.videos, userID);
    this.videos.forEach((v, i, newVideos) => {
      if (v.userID == userID) {
        existing = true;
        newVideos[i] = newVideo;
      }
    })
    if (existing == false) {
      this.videos.push(newVideo);
    }
  }
  async streamCamera() {
    this.currentStream = await navigator.mediaDevices.getUserMedia(gumOptions);
    this.addMyVideo(this.currentStream);
    if (this.peerService.myPeer.disconnected) {
      await this.peerService.myPeer.reconnect();
    }
    this.socket.peerID(this.peerService.myPeerID);
    this.answering(this.currentStream);
    //this.calling(this.currentStream);
    this.isCallStarted = true;
  }
  async streamScreen() {
    this.currentStream = await navigator.mediaDevices.getDisplayMedia(gdmOptions);
    this.addMyVideo(this.currentStream);
    if(this.peerService.myPeer.disconnected) {
      await this.peerService.myPeer.reconnect();
    }
    this.socket.peerID(this.peerService.myPeerID)
    this.answering(this.currentStream);
    //this.calling(this.currentStream)
    this.isCallStarted = true;
  }
  endCall(call: any) {
    call.close();
    this.calls = this.calls.filter((c: any) => c !== call);
    this.videos = this.videos.filter((video) => video.userID);
  }
  calling(peerID: string) {
    if(confirm(`Do you want to call ${peerID}`)) {
      const call = this.peerService.myPeer.call(peerID, this.currentStream, {
        metadata: { peerID: this.ownID },
      });
      this.currentCall = call;
      this.calls.push(call);

      console.log(call);
      call.on('stream', (otherUserVideoStream: MediaStream) => {
        console.log('receiving other user stream after the connections');
        this.addOtherUserVideo(peerID, otherUserVideoStream);
      })
      call.on('close', () => {
        this.videos = this.videos.filter((video) => video.userID !== peerID);
        this.calls = this.calls.filter((c:any) => c !== call);
        this.endCall(call);
      })
    }
  }
  answering(stream: any) {
    this.peerService.myPeer.on('call', (call:any) => {
      console.log("receiving calls", call);
      if(call.metadata.peerID !== this.ownID) {
        if(confirm(`Accept call from ${call.metadata.peerID}`)) {
          call.answer(stream);
          this.currentCall = call;
          this.calls.push(call);
          call.on('stream', (otherUserVideoStream: MediaStream) => {
            console.log('receiving other stream', otherUserVideoStream);
            this.addOtherUserVideo(call.metadata.peerID, otherUserVideoStream);
          });
          call.on('close', () => {
            this.videos = this.videos.filter((video) => video.userID !== call.metadata.peerID);
            this.calls = this.calls.filter((c:any) => c !== call);
            this.endCall(call)
          });
          call.on('error', (err:any) => {
            console.log(err);
          })
        }
      }
    })
  }
}