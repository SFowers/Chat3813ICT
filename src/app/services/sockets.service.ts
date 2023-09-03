import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { Message } from '../message';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  private socket: any;
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

  public send(message: string): void {
    this.socket.emit('message', message);
  }
}