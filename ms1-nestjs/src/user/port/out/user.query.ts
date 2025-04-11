export interface GetUserQuery{
    id: number;
}

export interface GetUsersQuery{
}

export interface CreateUserQuery{
    name: string;
    email: string;
}

export interface UpdateUserQuery extends Partial<CreateUserQuery>{
    id: number
}

export interface RemoveUserQuery{
    id: number;
}