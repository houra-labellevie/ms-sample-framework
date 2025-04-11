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
  import { UserService } from './domain/user.service';
import { CreateUserDto, UpdateUserDto } from './adapter/in/user.dto';
import { CreateUserCmd, GetUserCmd, GetUsersCmd, RemoveUserCmd, UpdateUserCmd } from './port/in/user.command';

  
  @Controller('user')
  export class UserController {
    constructor(@Inject('UserService') private readonly userService: UserService) {}
  
    @Get()
    findAll() {
      const cmd: GetUsersCmd = {};
      return this.userService.getAll(cmd);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      const cmd: GetUserCmd = {id: Number(id)};
      return this.userService.get(cmd);
    }
  
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
      const cmd: CreateUserCmd = createUserDto
      return this.userService.create(cmd);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
      const cmd:UpdateUserCmd = {...updateUserDto, id: Number(id)};
      return this.userService.update(cmd);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      const cmd: RemoveUserCmd = {id: Number(id)};
      return this.userService.remove(cmd);
    }
  }