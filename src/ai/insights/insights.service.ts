import { Injectable } from '@nestjs/common';
import { CreateInsightDto } from './dto/create-insight.dto';
import { UpdateInsightDto } from './dto/update-insight.dto';

@Injectable()
export class InsightsService {
  create(createInsightDto: CreateInsightDto) {
    return 'This action adds a new insight';
  }

  findAll() {
    return `This action returns all insights`;
  }

  findOne(id: number) {
    return `This action returns a #${id} insight`;
  }

  update(id: number, updateInsightDto: UpdateInsightDto) {
    return `This action updates a #${id} insight`;
  }

  remove(id: number) {
    return `This action removes a #${id} insight`;
  }
}
