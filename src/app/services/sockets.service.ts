import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import {io, Socket} from 'socket.io-client';
import { Message } from '../message';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  private socket: any;
  private socketid: any;
  messages = signal<Message[]>([]);

  constructor() {}

  initSocket() {
    this.socket = io(SERVER_URL);
    return () => {this.socket.disconnect();}
  }

  getMessage() {
    //return new Observable(observer => {
    //  this.socket.on('message', (data:string) => {observer.next(data)});
    //});
    return this.obsFromIO(this.socket, 'message');
  }

  public sendMessage(message:string, username:string, avatar:any) {
    this.socket.emit('message', {message, username, avatar});
  }

  peerID(message:string) {
    this.socket.emit('peerID', message)
  }

  getPeerID() {
    return new Observable(observer => {
      this.socket.on('peerID', (data:string) => {
        observer.next(data)
      });
    });
  }

  private obsFromIO(io:any, eventname:any) {
    return new Observable(observer=> {
      io.on(eventname, (data:any)=> {
        let msgdata:Message = new Message(data.message, new Date, 1, data.username, data.avatar);
        observer.next(msgdata);
      })
    })
  }
  joinRoom(room:string) {
    this.socket.emit("joinRoom", room);
  }
  leaveRoom(room:string) {
    this.socket.emit("leaveRoom", room);
  }
  reqRoomList() {
    this.socket.emit('roomList', 'list please');
  }
  getRoomList(next: (res:any) => void) {
    this.socket.on('roomList', (res:any) => next(res));
  }
}