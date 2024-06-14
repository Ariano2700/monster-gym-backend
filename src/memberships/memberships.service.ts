import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipsType } from 'src/memberships_type/entities/memberships_type.entity';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';
import { User } from 'src/users/entities/user.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,
    @InjectRepository(MembershipsType)
    private readonly membershipsTypeRepository: Repository<MembershipsType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Cron('0 0 * * *') // Ejecutar todos los días a la medianoche
  async updateMembershipStatus() {
    const memberships = await this.membershipRepository.find();
    const today = new Date();

    for (const membership of memberships) {
      let newStatus = membership.active;

      if (membership.end_date < today) {
        newStatus = false;
      } else if (
        membership.start_date <= today &&
        membership.end_date >= today
      ) {
        newStatus = true;
      }

      if (newStatus !== membership.active) {
        await this.membershipRepository.update(membership.id, {
          active: newStatus,
        });
      }
    }
  }

  async create(createMembershipDto: CreateMembershipDto) {
    const { id_user, id_memberships_type, start_date, end_date } =
      createMembershipDto;

    const idUser = await this.userRepository.findOne({
      where: { id: id_user },
    });
    if (!idUser) {
      throw new HttpException(
        'ID user is not found or exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const idMembershipsType = await this.membershipsTypeRepository.findOne({
      where: { id: id_memberships_type },
    });
    if (!idMembershipsType) {
      throw new HttpException(
        'ID memberships type is not found or exist',
        HttpStatus.NOT_FOUND,
      );
    }

    const today = new Date();
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const isActive = startDate <= today && endDate >= today;

    const membership = await this.membershipRepository.create({
      ...createMembershipDto,
      id_user: idUser,
      id_memberships_type: idMembershipsType,
      active: isActive,
    });
    return this.membershipRepository.save(membership);
  }

  async findAll() {
    return this.membershipRepository.find();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      throw new HttpException(
        'Id of a membership must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    const membershipFound = await this.membershipRepository.findOne({
      where: { id: id },
    });
    if (!membershipFound) {
      throw new HttpException('Membership is not found', HttpStatus.NOT_FOUND);
    }
    return membershipFound;
  }

  async findOneIdUser(id: string): Promise<Membership> {
    const membershipFound = await this.membershipRepository.findOne({
      where: { id_user: { id } },
      relations: ['id_user', 'id_memberships_type'],
    });
    if (!membershipFound) {
      throw new HttpException('Membership is not found', HttpStatus.NOT_FOUND);
    }
    return membershipFound;
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto) {
    const {
      start_date,
      end_date,
      id_memberships_type,
      id_user,
      ...updateData
    } = updateMembershipDto;

    if (id_user) {
      const user = await this.userRepository.findOne({
        where: { id: id_user },
      });
      if (!user) {
        throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      updateData['id_user'] = user;
    }

    if (id_memberships_type) {
      const membershipType = await this.membershipsTypeRepository.findOne({
        where: { id: id_memberships_type },
      });
      if (!membershipType) {
        throw new HttpException(
          'MEMBERSHIP_TYPE_NOT_FOUND',
          HttpStatus.NOT_FOUND,
        );
      }
      updateData['id_memberships_type'] = membershipType;
    }

    // Convert start_date and end_date to Date objects if they exist
    const parsedStartDate = start_date ? new Date(start_date) : null;
    const parsedEndDate = end_date ? new Date(end_date) : null;

    const today = new Date();

    // Verificar y actualizar el estado activo basado en las nuevas fechas
    if (parsedStartDate && parsedEndDate) {
      const isActive = parsedStartDate <= today && parsedEndDate >= today;
      updateData['active'] = isActive;
    } else if (parsedStartDate && !parsedEndDate) {
      const currentMembership = await this.membershipRepository.findOne({
        where: { id },
      });
      if (
        currentMembership &&
        parsedStartDate <= today &&
        new Date(currentMembership.end_date) >= today
      ) {
        updateData['active'] = true;
      } else {
        updateData['active'] = false;
      }
    } else if (!parsedStartDate && parsedEndDate) {
      const currentMembership = await this.membershipRepository.findOne({
        where: { id },
      });
      if (
        currentMembership &&
        new Date(currentMembership.start_date) <= today &&
        parsedEndDate >= today
      ) {
        updateData['active'] = true;
      } else {
        updateData['active'] = false;
      }
    }

    const result = await this.membershipRepository.update(id, updateData);
    if (result.affected === 0) {
      throw new HttpException('MEMBERSHIP_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Membership updated successfully',
      membership: updateData,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number) {
    const result = await this.membershipRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('MEMBERSHIP_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Membership delted successfully',
      status: HttpStatus.OK,
    };
  }
}
