import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleService: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleService.create(createRoleDto);
    return this.roleService.save(role);
  }

  async findAll() {
    return this.roleService.find();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new HttpException(
        'Id of a role must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    const roleFound = this.roleService.findOne({ where: { id } });
    if (!roleFound) {
      throw new HttpException("Role it's not found ", HttpStatus.NOT_FOUND);
    }
    return roleFound;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const result = await this.roleService.update(id, updateRoleDto);
    if (result.affected === 0) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedRole = await this.roleService.findOne({
      where: { id },
    });
    if (!updatedRole) {
      throw new HttpException('ROLE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Role update successfully',
      role: updatedRole,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number) {
    const result = await this.roleService.delete(id);
    if (result.affected === 0) {
      throw new HttpException('ROLE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Role deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
