export class Message {
    message:string;
    datetime:Date;
    userid:number;

    constructor(_msg:string, _dt:Date, _userid:number) {
        this.message = _msg;
        this.datetime = _dt;
        this.userid = _userid;
    }
}