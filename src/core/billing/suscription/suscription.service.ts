import { Injectable } from '@nestjs/common';
import { CreateSuscriptionDto } from './dto/create-suscription.dto';
import { UpdateSuscriptionDto } from './dto/update-suscription.dto';

@Injectable()
export class SuscriptionService {
  create(createSuscriptionDto: CreateSuscriptionDto) {
    return 'This action adds a new suscription';
  }

  findAll() {
    return `This action returns all suscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suscription`;
  }

  update(id: number, updateSuscriptionDto: UpdateSuscriptionDto) {
    return `This action updates a #${id} suscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscription`;
  }
}
