import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(256)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(256)
	email: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(256)
	password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
