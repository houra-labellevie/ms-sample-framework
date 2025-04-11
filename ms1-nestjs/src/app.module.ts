import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleMySqlModule } from "@knaadh/nestjs-drizzle-mysql2";
import { UserModule } from "./user/user.module";
import * as schema from "./schema";

@Module({
	imports: [
		DrizzleMySqlModule.register({
			tag: "DB_DEV",
			mysql: {
				connection: "client",
				config: {
					host: "ms1-mysql",
					user: "admin",
					password: "admin",
					database: "ms1_db",
				},
			},
			config: {
				schema: {
					...schema,
				},
				mode: "default",
			},
		}),
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
