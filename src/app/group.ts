export class Group {
    id:number;
    groupname:string;
    admins = [];
    users = [];
    channels = [];
    applied = [];
    constructor(groupname:string = '', admins = [], users = [], channels = [], applied = [], id:number = 0) {
        this.groupname = groupname;
        this.admins = admins;
        this.users = users;
        this.channels = channels;
        this.applied = applied;
        this.id = id;
    }
}