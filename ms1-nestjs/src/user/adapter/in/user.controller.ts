import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Inject,
  } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { CreateUserCmd, GetUserCmd, GetUsersCmd, RemoveUserCmd, UpdateUserCmd } from '../../port/in/user.usecase.command';
import { UserUsecase } from 'src/user/port/in/user.usecase';

  
  @Controller('user')
  export class UserController {
    constructor(@Inject('UserService') private readonly userUsecase: UserUsecase) {}
  
    @Get()
    findAll() {
      const cmd: GetUsersCmd = {};
      return this.userUsecase.getAll(cmd);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      const cmd: GetUserCmd = {id: Number(id)};
      return this.userUsecase.get(cmd);
    }
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      const cmd: CreateUserCmd = createUserDto
      return this.userUsecase.create(cmd);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      const cmd:UpdateUserCmd = {...updateUserDto, id: Number(id)};
      return this.userUsecase.update(cmd);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      const cmd: RemoveUserCmd = {id: Number(id)};
      return this.userUsecase.remove(cmd);
    }
  }