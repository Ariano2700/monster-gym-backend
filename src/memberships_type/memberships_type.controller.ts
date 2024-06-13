import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MembershipsTypeService } from './memberships_type.service';
import { CreateMembershipsTypeDto } from './dto/create-memberships_type.dto';
import { UpdateMembershipsTypeDto } from './dto/update-memberships_type.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Membersships Type')
@Controller('memberships-type')
@UseGuards(JwtAuthGuard)
export class MembershipsTypeController {
  constructor(
    private readonly membershipsTypeService: MembershipsTypeService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new membership type' })
  create(@Body() createMembershipsTypeDto: CreateMembershipsTypeDto) {
    return this.membershipsTypeService.create(createMembershipsTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all memberships type' })
  findAll() {
    return this.membershipsTypeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get membership type by id' })
  findOne(@Param('id') id: string) {
    return this.membershipsTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update path of the membership type using id' })
  update(
    @Param('id') id: string,
    @Body() updateMembershipsTypeDto: UpdateMembershipsTypeDto,
  ) {
    return this.membershipsTypeService.update(+id, updateMembershipsTypeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete membership type with the id' })
  remove(@Param('id') id: string) {
    return this.membershipsTypeService.remove(+id);
  }
}
