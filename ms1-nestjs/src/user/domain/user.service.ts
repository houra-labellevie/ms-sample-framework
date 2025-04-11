import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema  from '../../schema';
import { CreateUserDto, UpdateUserDto } from '../adapter/in/user.dto';
import { CreateUserCmd, GetUserCmd, GetUsersCmd, RemoveUserCmd, UpdateUserCmd } from '../port/in/user.command';
import { UserUsecase } from '../port/in/user.usecase';

@Injectable()
export class UserService implements UserUsecase {
  constructor(
    @Inject('DB_DEV') private readonly drizzle: MySql2Database<typeof schema>,
    // @Inject('UserEventProducer') private readonly userEventProducer: UserEventProducer,
  ) {}

  async get(cmd: GetUserCmd){
    const user = await this.drizzle
      .select()
      .from(schema.user)
      .where(eq(schema.user.id, cmd.id))
      .execute();
    return user;
  }

  async getAll(cmd: GetUsersCmd){
    const users = await this.drizzle
      .select()
      .from(schema.user)
      .execute();
    return users;
  }

  async create(cmd: CreateUserCmd) {
    const response = await this.drizzle.insert(schema.user).values(cmd);
    // await this.userEventProducer.publish({
    //   type: 'ADDED_TO_USER',
    //   user: {
    //     name: createUserDto.name,
    //     email: createUserDto.email,
    //   },
    // });
    return response;
  }

  async update(cmd: UpdateUserCmd) {
    return await this.drizzle
      .update(schema.user)
      .set(cmd)
      .where(eq(schema.user.id, cmd.id));
  }

  async remove(cmd: RemoveUserCmd) {
    return await this.drizzle
      .delete(schema.user)
      .where(eq(schema.user.id, cmd.id))
      .limit(1);
  }
}