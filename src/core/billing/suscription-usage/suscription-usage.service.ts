import { Injectable } from '@nestjs/common';
import { CreateSuscriptionUsageDto } from './dto/create-suscription-usage.dto';
import { UpdateSuscriptionUsageDto } from './dto/update-suscription-usage.dto';

@Injectable()
export class SuscriptionUsageService {
  create(createSuscriptionUsageDto: CreateSuscriptionUsageDto) {
    return 'This action adds a new suscriptionUsage';
  }

  findAll() {
    return `This action returns all suscriptionUsage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suscriptionUsage`;
  }

  update(id: number, updateSuscriptionUsageDto: UpdateSuscriptionUsageDto) {
    return `This action updates a #${id} suscriptionUsage`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscriptionUsage`;
  }
}
