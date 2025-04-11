import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.KAFKA,
		options: {
		  client: {
			clientId: 'user-kafka',
			brokers: ['broker1:9092', 'broker2:9093'],
		  },
		  consumer: {
			groupId: 'user-consumer-group',
		  },
		},
	  });
	
	await app.startAllMicroservices();
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
