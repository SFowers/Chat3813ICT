export class User {
    id:number;
    username:string;
    email:string;
    pwd:string;
    permission:string;
    constructor(username:string='', email:string='', pwd:string='', permission:string='', id:number = 0){     
        this.username = username;
        this.email = email;
        this.pwd = pwd;
        this.permission = permission;
        this.id = id;
    }
}