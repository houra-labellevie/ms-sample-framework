import { PartialType } from "@nestjs/mapped-types";
import {
	IsEmail,
	IsNumber,
	IsString,
	MaxLength,
	MinLength,
} from "class-validator";

export class CreateUserDto {
	@IsString()
	@MinLength(1)
	@MaxLength(50)
	name: string;

	@IsString()
	@IsEmail()
	email: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
