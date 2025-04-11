export interface GetUserCmd {
    id: number;
}

export interface GetUsersCmd {
}

export interface CreateUserCmd {
    name: string;
    email: string;
}

export interface UpdateUserCmd extends Partial<CreateUserCmd> {
    id: number
}

export interface RemoveUserCmd {
    id: number;
}