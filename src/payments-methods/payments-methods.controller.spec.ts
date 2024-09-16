import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsMethodsController } from './payments-methods.controller';
import { PaymentsMethodsService } from './payments-methods.service';

describe('PaymentsMethodsController', () => {
  let controller: PaymentsMethodsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsMethodsController],
      providers: [PaymentsMethodsService],
    }).compile();

    controller = module.get<PaymentsMethodsController>(PaymentsMethodsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
