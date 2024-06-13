import { ApiProperty, PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';
import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Gender } from 'src/users/entities/user.entity';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
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
