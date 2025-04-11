import { Injectable, Inject } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { MySql2Database } from 'drizzle-orm/mysql2';
import * as schema  from '../schema';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('DB_DEV') private readonly drizzle: MySql2Database<typeof schema>,
    // @Inject('UserEventProducer') private readonly userEventProducer: UserEventProducer,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const response = await this.drizzle.insert(schema.user).values(createUserDto);
    // await this.userEventProducer.publish({
    //   type: 'ADDED_TO_USER',
    //   user: {
    //     name: createUserDto.name,
    //     email: createUserDto.email,
    //   },
    // });
    return response;
  }

  async findAll() {
    return await this.drizzle.query.user.findMany();
  }

  async findOne(id: number) {
    return await this.drizzle.query.user.findFirst({
      with: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.drizzle
      .update(schema.user)
      .set(updateUserDto)
      .where(eq(schema.user.id, id));
  }

  async remove(id: number) {
    return await this.drizzle
      .delete(schema.user)
      .where(eq(schema.user.id, id))
      .limit(1);
  }
}