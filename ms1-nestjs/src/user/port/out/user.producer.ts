import { CreateUserEventMessage } from "./user.event";

export interface UserEventProducerPort {
    publishCreateUser(message: CreateUserEventMessage): Promise<void>;
  }