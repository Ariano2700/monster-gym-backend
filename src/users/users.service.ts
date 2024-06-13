import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, id_roles, ...updateData } = updateUserDto;

    if (id_roles) {
      const role = await this.roleRepository.findOne({
        where: { id: id_roles },
      });
      if (!role) {
        throw new HttpException('ROLE_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      updateData['role'] = role;
    }

    if (password) {
      const hashedPassword = await hash(password, 10);
      updateData["password"] = hashedPassword;
    }

    const result = await this.userRepository.update(id, updateData);

    if (result.affected === 0) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.userRepository.findOne({
      where: { id },
    });
    if (!updatedUser) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'User updated successfully',
      user: updatedUser,
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User delted successfully',
      status: HttpStatus.OK,
    };
  }
}
