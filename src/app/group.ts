export class Group {
    id:number;
    groupname:string;
    admins = [];
    users = [];
    applied = [];
    constructor(groupname:string = '', admins = [], users = [], applied = [], id:number = 0) {
        this.groupname = groupname;
        this.admins = admins;
        this.users = users;
        this.applied = applied;
        this.id = id;
    }
}