import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
    @IsOptional()
    @IsString()
    @Length(1,50)
    @ApiProperty({ required: false, description: 'Description' })
    description?: string;
}
