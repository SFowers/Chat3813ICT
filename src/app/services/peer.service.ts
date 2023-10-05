import { Injectable } from '@angular/core';
import { SocketsService } from './sockets.service';
import { Observable } from 'rxjs';
import { Peer } from 'peerjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  myPeerID = uuidv4();
  myPeer:any;
  streamCamera:any;
  streamScreen:any;

  constructor() {
    this.myPeer = new Peer(this.myPeerID, {
      host: "localhost",
      secure: true,
      port: 3001,
      path: "/",
    });
  }
}
