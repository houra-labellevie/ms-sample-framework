import {
	CreateUserQuery,
	GetUserQuery,
	GetUsersQuery,
	RemoveUserQuery,
	UpdateUserQuery,
} from "./user.db.query";

export interface UserDbPort {
	get: (args: GetUserQuery) => Promise<unknown>;
	getAll: (args: GetUsersQuery) => Promise<unknown>;
	create: (args: CreateUserQuery) => Promise<{id: number}>;
	update: (args: UpdateUserQuery) => Promise<unknown>;
	remove: (aegs: RemoveUserQuery) => Promise<unknown>;
}
