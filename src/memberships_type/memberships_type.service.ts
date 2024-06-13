import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMembershipsTypeDto } from './dto/create-memberships_type.dto';
import { UpdateMembershipsTypeDto } from './dto/update-memberships_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MembershipsType } from './entities/memberships_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MembershipsTypeService {
  constructor(
    @InjectRepository(MembershipsType)
    private readonly membershipsTypeRepository: Repository<MembershipsType>,
  ) {}

  async create(createMembershipsTypeDto: CreateMembershipsTypeDto) {
    const membershipsType = await this.membershipsTypeRepository.create(
      createMembershipsTypeDto,
    );
    return this.membershipsTypeRepository.save(membershipsType);
  }

  async findAll() {
    return this.membershipsTypeRepository.find();
  }

  async findOne(id: string) {
    const idParse = parseInt(id);
    if (isNaN(idParse)) {
      throw new HttpException(
        'Id of a membership type must be a number',
        HttpStatus.BAD_REQUEST,
      );
    }
    const membershipsTypeFound = this.membershipsTypeRepository.findOne({
      where: { id: idParse },
    });
    if (!membershipsTypeFound) {
      throw new HttpException(
        'Membership type is not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return membershipsTypeFound;
  }

  async update(id: number, updateMembershipsTypeDto: UpdateMembershipsTypeDto) {
    const result = await this.membershipsTypeRepository.update(
      id,
      updateMembershipsTypeDto,
    );
    if (result.affected === 0) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const updatedMembershipsType = await this.membershipsTypeRepository.findOne(
      {
        where: { id },
      },
    );
    if (!updatedMembershipsType) {
      throw new HttpException(
        'MEMBERSHIP_TYPE_NOT_FOUND',
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      message: 'Membership type update successfully',
      membership_type: updatedMembershipsType,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number) {
    const result = await this.membershipsTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('ROLE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'Membership type deleted successfully',
      status: HttpStatus.OK,
    };
  }
}
