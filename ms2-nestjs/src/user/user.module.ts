import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserService } from './domain/user.service';
import { UserDbAdapter } from './adapter/out/user.repository';
import { UserEventConsumer } from './adapter/in/user.consumer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            // clientId: 'user-kafka',
            brokers: ['broker1:9092', 'broker2:9093'],
          },
          consumer: {
            groupId: 'user-consumer-group',
          },
        },
      },
    ]),
  ],
  controllers: [
    UserEventConsumer
  ],
  providers: [
    {
      provide: 'UserService',
      useClass: UserService,
    },
    {
      provide: "UserDbAdapter",
      useClass: UserDbAdapter
    },
  ],
})
export class UserModule {}