export class Message {
    message:string;
    datetime:Date;
    userid:number;
    username:string;
    avatar:any;

    constructor(_msg:string, _dt:Date, _userid:number, _username:string, _avatar:any) {
        this.message = _msg;
        this.datetime = _dt;
        this.userid = _userid;
        this.username = _username;
        this.avatar = _avatar;
    }
}