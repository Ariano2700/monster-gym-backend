import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMembershipDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'Start date' })
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'End date' })
  end_date: Date;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'Memberships type ID' })
  id_memberships_type: number;

  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({ required: true, description: 'User ID' })
  id_user: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ required: true, description:'Boolean active membership'})
  active?: boolean;
}
