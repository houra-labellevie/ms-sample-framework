import { Inject, Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { UserDbPort } from "src/user/port/out/user.db";
import {User as UserSchema} from "./user.entity"
import { eq } from "drizzle-orm";
import { CreateUserQuery, GetUserQuery, GetUsersQuery, RemoveUserQuery, UpdateUserQuery } from "src/user/port/out/user.db.query";

const schema = {
    user: UserSchema
} as const

@Injectable()
export class UserDbAdapter implements UserDbPort {

    constructor(
        @Inject('DB_DEV') private readonly drizzle: MySql2Database<typeof schema>,
    ) {}

    async get(args: GetUserQuery) {
        const user = await this.drizzle
              .select()
              .from(UserSchema)
              .where(eq(UserSchema.id, args.id))
              .execute();
            return user;
    }

    async getAll(args: GetUsersQuery) {
        const users = await this.drizzle
              .select()
              .from(schema.user)
              .execute();
            return users;
    }

    async create(args: CreateUserQuery) {
        const response = await this.drizzle.insert(schema.user).values(args);
        return response;
    }

    async update(args: UpdateUserQuery) {
        return await this.drizzle
            .update(schema.user)
            .set(args)
            .where(eq(schema.user.id, args.id));
    }

    async remove(args: RemoveUserQuery) {
        return await this.drizzle
            .delete(schema.user)
            .where(eq(schema.user.id, args.id))
            .limit(1);
    }
}