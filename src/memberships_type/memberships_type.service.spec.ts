import { Test, TestingModule } from '@nestjs/testing';
import { MembershipsTypeService } from './memberships_type.service';

describe('MembershipsTypeService', () => {
  let service: MembershipsTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembershipsTypeService],
    }).compile();

    service = module.get<MembershipsTypeService>(MembershipsTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
