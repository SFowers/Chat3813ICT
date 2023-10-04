import { Component, OnInit } from '@angular/core';
import { SocketsService } from '../services/sockets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  messageContent:string = "";
  messages:string[] = [];
  ioConnection:any;

  constructor(private socket:SocketsService) {}

  ngOnInit() {
    this.initIoConnection();
  }
  private initIoConnection() {
    this.socket.initSocket();
    this.ioConnection = this.socket.getMessage()
      .subscribe((message:any) => {
        this.messages.push(message);
      });
  }

  chat() {
    if(this.messageContent) {
      this.socket.sendMessage(this.messageContent);
      this.messageContent = "";
    } else {
      console.log("no message");
    }
  }
}