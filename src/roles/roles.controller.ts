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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Roles')
@Controller('roles')
@UseGuards(JwtAuthGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new role' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all roles' })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by id' })
  findOne(@Param('id') id: string) {
    const idParse = parseInt(id);
    return this.rolesService.findOne(idParse);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update path of the role using id' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    const idParse = parseInt(id);
    return this.rolesService.update(idParse, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete role with the id' })
  remove(@Param('id') id: string) {
    const idParse = parseInt(id);
    return this.rolesService.remove(idParse);
  }
}
