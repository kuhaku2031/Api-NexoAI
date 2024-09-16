import { SalesDetailsService } from './../sales-details/sales-details.service';
import { PointSaleService } from './../point-sale/point-sale.service';
import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    private readonly salesDetailsService: SalesDetailsService,

    private readonly pointSaleService: PointSaleService,
  ) {}
  async create(createSaleDto: CreateSaleDto): Promise<Sale> {
    try {
      const { product, ...saleData } = createSaleDto;

      // Buscar la entidad PointSale
      const pointSaleEntity = await this.pointSaleService.findOnePointSale(
        createSaleDto.point_sale,
      );

      if (!pointSaleEntity) {
        throw new Error('PointSale not found');
      }

      // Crear la venta
      const sale = this.saleRepository.create({
        ...saleData,
        point_sale: pointSaleEntity,
        product: product,
      });
      await this.saleRepository.save(sale);

      if (!product) {
        console.log(product);
      } else {
        console.log(product);
      }

      // Crear los detalles de la venta
      const salesDetailsDtos = product.map((product) => ({
        code: product.code,
        quantity: product.quantity,
        selling_price: product.selling_price,
        sale_id: sale.sale_id,
        product: product,
      }));

      await this.salesDetailsService.createSaleDetail(salesDetailsDtos);

      // Guardar y retornar la venta con los detalles
      const savedSale = await this.saleRepository.save(sale);
      return savedSale;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating sale');
    }
  }

  async findAll() {
    return await this.saleRepository.find();
  }

  async remove(sale_id: number) {
    try {
      const sale = await this.saleRepository.findOne({
        where: { sale_id },
      });

      if (!sale) {
        throw new Error(`Sale with id ${sale_id} not found`);
      }

      const saleDetail = await this.salesDetailsService.getSalesDetail({
        where: { sale_id },
      });

      if (!saleDetail) {
        throw new Error(`Sale with id ${sale_id} not found`);
      } else {
        console.log(sale_id);
      }

      await this.salesDetailsService.removeSaleDetail(saleDetail);

      return await this.saleRepository.remove(sale);
    } catch (error) {
      console.error(error);
      throw new Error('Error removing sale');
    }
  }
}
