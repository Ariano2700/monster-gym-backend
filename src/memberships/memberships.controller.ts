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
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Memberships')
@Controller('memberships')
@UseGuards(JwtAuthGuard)
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new membership' })
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.create(createMembershipDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all memberships' })
  findAll() {
    return this.membershipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get membership by id' })
  findOne(@Param('id') id: string) {
    return this.membershipsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update path of the membership using id' })
  update(
    @Param('id') id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return this.membershipsService.update(+id, updateMembershipDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete membership with the id' })
  remove(@Param('id') id: string) {
    return this.membershipsService.remove(+id);
  }
}
