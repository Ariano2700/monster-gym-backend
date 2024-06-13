import { Module } from '@nestjs/common';
import { MembershipsTypeService } from './memberships_type.service';
import { MembershipsTypeController } from './memberships_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipsType } from './entities/memberships_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipsType])],
  controllers: [MembershipsTypeController],
  providers: [MembershipsTypeService],
  exports: [MembershipsTypeService]
})
export class MembershipsTypeModule {}
