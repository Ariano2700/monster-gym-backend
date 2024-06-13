import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsNumber,
  IsOptional,
  Length,
  Min,
  Max,
  IsIn,
  IsDateString,
} from 'class-validator';
import { Gender } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty({ description: 'User name', example: 'John' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty({ description: 'User lastname', example: 'Doe' })
  lastname: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty({ description: 'User username', example: 'johndoe' })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty({ description: 'User email', example: 'johndoe@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  @ApiProperty({ description: 'User password', example: 'strongpassword' })
  password: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999.99)
  @ApiProperty({ description: 'User height', required: false, example: 175 })
  height?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999.99)
  @ApiProperty({ description: 'User weight', required: false, example: 70 })
  weight?: number;

  @IsString()
  @IsNotEmpty()
  @IsIn(['Masculino', 'Femenino', 'Otro'])
  @ApiProperty({
    description: 'User gender',
    enum: Gender,
    example: 'Masculino',
  })
  gender: Gender;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User birthday', example: '2000-01-01' })
  birthday: Date;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Role ID', example: 1 })
  id_roles: number;
}
