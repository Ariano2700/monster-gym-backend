import { Test, TestingModule } from '@nestjs/testing';
import { MembershipsTypeController } from './memberships_type.controller';
import { MembershipsTypeService } from './memberships_type.service';

describe('MembershipsTypeController', () => {
  let controller: MembershipsTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembershipsTypeController],
      providers: [MembershipsTypeService],
    }).compile();

    controller = module.get<MembershipsTypeController>(MembershipsTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
