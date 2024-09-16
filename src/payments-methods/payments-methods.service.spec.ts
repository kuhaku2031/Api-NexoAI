import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsMethodsService } from './payments-methods.service';

describe('PaymentsMethodsService', () => {
  let service: PaymentsMethodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsMethodsService],
    }).compile();

    service = module.get<PaymentsMethodsService>(PaymentsMethodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
