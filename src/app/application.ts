export class Application {
    permission:string;
    username:string;
    constructor(permission:string = '', username:string = '') {
        this.permission = permission;
        this.username = username;
    }
}