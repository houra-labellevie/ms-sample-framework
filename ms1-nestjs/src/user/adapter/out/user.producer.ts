import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka, KafkaHeaders } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import { KafkaService } from 'src/kafka/kafka-service';
import { CreateUserEventMessage } from 'src/user/port/out/user.event';
import { UserEventProducerPort } from 'src/user/port/out/user.producer';

const topicIds = {
  CREATE_USER: 'create-user'
};


@Injectable()
export class UserEventProducer extends KafkaService implements UserEventProducerPort {
  public constructor(
    @Inject('KAFKA_SERVICE') kafkaClient: ClientKafka
  ) {
    super([topicIds.CREATE_USER], kafkaClient);
  }

  public async publishCreateUser(message: CreateUserEventMessage): Promise<void> {
    try {
          console.log("message emmit:", message);
          this.kafkaClient.emit(topicIds.CREATE_USER, {
            key: message.userId,
            value: JSON.stringify(message),
            sample: 'emit method',
          });

          // example: using the send() method.
        //   const res = await this.kafkaClient
        //     .send(topicIds.CREATE_USER, {
        //       messages: [
        //         {
        //           key: message.userId,
        //           value: JSON.stringify(message),
        //           headers: {
        //             [KafkaHeaders.CORRELATION_ID]: randomUUID(),
        //             [KafkaHeaders.REPLY_TOPIC]: topicIds.CREATE_USER,
        //           },
        //         },
        //       ],
        //     })
        //     .toPromise();

    } catch (error) {
      console.error('Error while sending message: ', error);
    }
  }
}
