import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMembershipsTypeDto } from './create-memberships_type.dto';
import { IsInt, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateMembershipsTypeDto extends PartialType(CreateMembershipsTypeDto) {
    @IsString()
    @IsOptional()
    @Length(1, 50)
    @ApiProperty({ required: false, description: 'Name' })
    name?: string;
  
    @IsString()
    @IsOptional()
    @Length(1, 225)
    @ApiProperty({ required: false, description: 'Description' })
    description?: string;
  
    @IsInt()
    @Min(0)
    @IsOptional()
    @ApiProperty({ required: false, description: 'Price' })
    price?: number;
}
