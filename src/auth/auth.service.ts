import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/roles/entities/role.entity';
import { MembershipsType } from 'src/memberships_type/entities/memberships_type.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private jwtService: JwtService,
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password, email, username, id_roles } = userObject;

    const existingUsername = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUsername)
      throw new HttpException(
        'Username is already in use',
        HttpStatus.BAD_REQUEST,
      );

    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser)
      throw new HttpException(
        'Email is already in use',
        HttpStatus.BAD_REQUEST,
      );

    const role = await this.roleRepository.findOne({ where: { id: id_roles } });
    if (!role) {
      throw new HttpException('Role not found', HttpStatus.BAD_REQUEST);
    }

    const createdAt = new Date();
    const updatedAt = new Date();

    const hashedPassword = await hash(password, 10);

    const user = this.userRepository.create({
      ...userObject,
      create_at: createdAt,
      update_at: updatedAt,
      password: hashedPassword,
      id_roles: role,
    });

    return this.userRepository.save(user);
  }

  async login(userObject: LoginAuthDto) {
    const { email, password } = userObject;

    const findUser = await this.userRepository.findOne({ where: { email } });
    if (!findUser)
      throw new HttpException('USER_EMAIL_NOT_FOUND', HttpStatus.NOT_FOUND);

    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword)
      throw new HttpException('PASSWORD_IS_WRONG', HttpStatus.FORBIDDEN);

    const payload = { id: findUser.id, name: findUser.name };
    const token = await this.jwtService.sign(payload);
    const data = {
      user: findUser,
      access_token: token,
      status: HttpStatus.OK,
    };
    return data;
  }
}
