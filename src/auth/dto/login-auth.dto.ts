import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length, ValidateIf } from "class-validator"

export class LoginAuthDto {
    @IsEmail()
    @IsNotEmpty()
    @Length(1, 255)
    @ApiProperty({ required: true, description: 'Email', example:"example@example.com" })
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    @ApiProperty({ required: true, description: 'Password', example: "Example82709@" })
    password: string;
  }