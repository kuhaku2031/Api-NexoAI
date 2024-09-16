import { Injectable } from '@nestjs/common';
import { CreateSalesDetailDto } from './dto/create-sales-detail.dto';
// import { UpdateSalesDetailDto } from './dto/update-sales-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesDetail } from './entities/sales-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesDetailsService {
  constructor(
    @InjectRepository(SalesDetail)
    private readonly salesDetailsRepository: Repository<SalesDetail>,
  ) {}
  async createSaleDetail(createSalesDetailDtos: CreateSalesDetailDto[]) {
    const salesDetails = createSalesDetailDtos.map((dto) =>
      this.salesDetailsRepository.create(dto),
    );
    await this.salesDetailsRepository.save(salesDetails);
    return salesDetails;
  }

  findAll() {
    return this.salesDetailsRepository.find();
  }

  async getSalesDetail(conditions: any): Promise<SalesDetail[]> {
    return await this.salesDetailsRepository.find(conditions);
  }

  // update(id: number, updateSalesDetailDto: UpdateSalesDetailDto) {
  //   return `This action updates a #${id} salesDetail`;
  // }

  async removeSaleDetail(saleDetails: any){
    return await this.salesDetailsRepository.remove(saleDetails);
  }
}
