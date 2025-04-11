import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './domain/user.service';
import { UserController } from './adapter/in/user.controller';
import { UserDbAdapter } from './adapter/out/user.repository';
// import { UserEventProducer } from './producer/user-event.producer';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'KAFKA_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         clientId: 'user-kafka',
    //         brokers: ['broker1:9092', 'broker2:9093'],
    //       },
    //       consumer: {
    //         groupId: 'user-consumer-group',
    //       },
    //     },
    //   },
    // ]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserService',
      useClass: UserService,
    },
    {
      provide: "UserDbAdapter",
      useClass: UserDbAdapter
    },
    // {
    //   provide: 'UserEventProducer',
    //   useClass: UserEventProducer,
    // },
  ],
})
export class UserModule {}