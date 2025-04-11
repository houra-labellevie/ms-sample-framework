import { Injectable, Inject } from '@nestjs/common';
import { CreateUserCmd, GetUserCmd, GetUsersCmd, RemoveUserCmd, UpdateUserCmd } from '../port/in/user.usecase.command';
import { UserUsecase } from '../port/in/user.usecase';
import { UserDbPort } from '../port/out/user.db';
import { UserEventProducer } from '../adapter/out/user.producer';

@Injectable()
export class UserService implements UserUsecase {
  constructor(
    @Inject('UserDbAdapter') private readonly userDbAdapter: UserDbPort,
    @Inject('UserEventProducer') private readonly userEventProducer: UserEventProducer
  ) {}

  async get(cmd: GetUserCmd){
    const user = await this.userDbAdapter.get(cmd);
    return user;
  }

  async getAll(cmd: GetUsersCmd){
    const users = await this.userDbAdapter.getAll(cmd);
    return users;
  }

  async create(cmd: CreateUserCmd) {
    const response = await this.userDbAdapter.create(cmd);
    await this.userEventProducer.publishCreateUser({
      userId: response.id,
      name: cmd.name,
      email: cmd.email,
      createdAt: new Date(),
    });
    return response;
  }

  async update(cmd: UpdateUserCmd) {
    return await this.userDbAdapter.update(cmd);
  }

  async remove(cmd: RemoveUserCmd) {
    return await this.userDbAdapter.remove(cmd);
  }
}