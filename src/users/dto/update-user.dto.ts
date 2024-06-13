import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Gender } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiProperty({ required: false, description: 'User name' })
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiProperty({ required: false, description: 'User lastname' })
  lastname?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiProperty({ required: false, description: 'User username' })
  username?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  @ApiProperty({ required: false, description: 'User email' })
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  @ApiProperty({ required: false, description: 'User password' })
  password?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999.99)
  @ApiProperty({ required: false, description: 'User height' })
  height?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999.99)
  @ApiProperty({ required: false, description: 'User weight' })
  weight?: number;

  @IsOptional()
  @IsString()
  @IsIn(['Masculino', 'Femenino', 'Otro'])
  @ApiProperty({ required: false, enum: Gender, description: 'User gender' })
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false, description: 'User birthday' })
  birthday?: Date;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ required: false, description: 'Role ID' })
  id_roles?: number;
}
