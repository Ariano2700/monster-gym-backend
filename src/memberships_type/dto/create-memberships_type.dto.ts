import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateMembershipsTypeDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 225)
  description: string;

  @IsInt()
  @Min(0)
  price: number;
}
