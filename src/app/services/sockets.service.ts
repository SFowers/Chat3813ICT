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
    return new Observable(observer => {
      this.socket.on('message', (data:string) => {observer.next(data)});
    });
  }

  public sendMessage(message: string) {
    this.socket.emit('message', message);
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
      io.on(eventname, (data:string)=> {
        let msgdata:Message = new Message(data, new Date, 1);
        observer.next(msgdata);
      })
    })
  }
}