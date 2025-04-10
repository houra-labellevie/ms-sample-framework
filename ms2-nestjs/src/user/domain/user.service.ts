import { Injectable, Inject } from '@nestjs/common';
import { CreateUserCmd, GetUserCmd, GetUsersCmd, RemoveUserCmd, UpdateUserCmd } from '../port/in/user.usecase.command';
import { UserUsecase } from '../port/in/user.usecase';
import { UserDbPort } from '../port/out/user.db';

@Injectable()
export class UserService implements UserUsecase {
  constructor(
    @Inject('UserDbAdapter') private readonly userDbAdapter: UserDbPort,
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
    return response;
  }

  async update(cmd: UpdateUserCmd) {
    return await this.userDbAdapter.update(cmd);
  }

  async remove(cmd: RemoveUserCmd) {
    return await this.userDbAdapter.remove(cmd);
  }
}