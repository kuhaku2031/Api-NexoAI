import { Injectable } from '@nestjs/common';
import { CreateSuscriptionPlanDto } from './dto/create-suscription-plan.dto';
import { UpdateSuscriptionPlanDto } from './dto/update-suscription-plan.dto';

@Injectable()
export class SuscriptionPlansService {
  create(createSuscriptionPlanDto: CreateSuscriptionPlanDto) {
    return 'This action adds a new suscriptionPlan';
  }

  findAll() {
    return `This action returns all suscriptionPlans`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suscriptionPlan`;
  }

  update(id: number, updateSuscriptionPlanDto: UpdateSuscriptionPlanDto) {
    return `This action updates a #${id} suscriptionPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscriptionPlan`;
  }
}
