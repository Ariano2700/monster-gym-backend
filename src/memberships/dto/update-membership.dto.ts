import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMembershipDto } from './create-membership.dto';
import { IsBoolean, IsDateString, IsInt, IsOptional, IsUUID } from 'class-validator';

export class UpdateMembershipDto extends PartialType(CreateMembershipDto) {
  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false, description: 'Start date' })
  start_date?: Date;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false, description: 'End date' })
  end_date?: Date;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false, description: 'Memberships type ID' })
  id_memberships_type?: number;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ required: false, description: 'User ID' })
  id_user?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, description:'Boolean active membership'})
  active?: boolean;
}
