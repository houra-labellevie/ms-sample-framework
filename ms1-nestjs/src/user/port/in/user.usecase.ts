import { CreateUserCmd, GetUserCmd, GetUsersCmd, RemoveUserCmd, UpdateUserCmd } from "./user.usecase.command";

export interface UserUsecase {
    get: (cmd: GetUserCmd) => Promise<unknown>
    getAll: (cmd: GetUsersCmd) => Promise<unknown>
    create: (cmd: CreateUserCmd) => Promise<unknown>
    update: (cmd: UpdateUserCmd) => Promise<unknown>
    remove: (cmd: RemoveUserCmd) => Promise<unknown>
}