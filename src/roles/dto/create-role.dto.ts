import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @Length(1,50)
    @ApiProperty({ required: true, description: 'Description' })
    description: string;
}
