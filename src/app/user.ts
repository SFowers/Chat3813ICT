export class User {
    id:number;
    username:string;
    email:string;
    pwd:string;
    permission:string;
    roles = [];
    groups = [];
    constructor(username:string='', email:string='', pwd:string='', permission:string='', roles = [], groups = [], id:number = 0){     
        this.username = username;
        this.email = email;
        this.pwd = pwd;
        this.permission = permission;
        this.roles = roles;
        this.groups = groups;
        this.id = id;
    }
}