export interface Group {
    groupname: string;
    list: string[];
}

export interface CreateGroupInput {
    groupname: string;
    list: string;
}

export type HandleUserType = { groupId: string, userId: string }
