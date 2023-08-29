export class User {
    id:number;
    username:string;
    email:string;
    pwd:string;
    constructor(username:string='', email:string='', pwd:string='', id:number = 0){     
        this.username = username;
        this.email = email;
        this.pwd=pwd;
        this.id = id;
    }
}