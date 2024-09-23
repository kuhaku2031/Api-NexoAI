import { SalesDetailsService } from './../sales-details/sales-details.service';
import { PointSaleService } from './../point-sale/point-sale.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { CreateSaleWithPaymentDto } from './dto/create-sale-with-payment.dto';
import { PaymentsDetailsService } from 'src/payments-details/payments-details.service';
import { Payment } from 'src/payments/entities/payment.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    private readonly salesDetailsService: SalesDetailsService,

    private readonly pointSaleService: PointSaleService,

    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    private readonly paymentDetailsService: PaymentsDetailsService,
  ) {}
  async createSale(
    createSaleWithPaymentDto: CreateSaleWithPaymentDto,
  ): Promise<any> {
    const { saleData, paymentData } = createSaleWithPaymentDto;

    try {
      return await this.saleRepository.manager.transaction(
        async (transactionalEntityManager) => {
          
          // Buscar la entidad PointSale
          const pointSaleEntity = await this.pointSaleService.findOnePointSale(
            saleData.point_sale,
          );

          if (!pointSaleEntity) {
            throw new Error('PointSale not found');
          }

          // Crear la venta
          const sale = this.saleRepository.create({
            ...saleData,
            point_sale: pointSaleEntity,
            product: saleData.product,
          });
          await transactionalEntityManager.save(sale);

          // Crear los detalles de la venta
          const salesDetailsDtos = saleData.product.map((product) => ({
            code: product.code,
            quantity: product.quantity,
            selling_price: product.selling_price,
            sale: sale.sale_id,
            product: product,
          }));

          await this.salesDetailsService.createSaleDetail(
            salesDetailsDtos,
            transactionalEntityManager,
          );

          const saleConfirmExisting = await transactionalEntityManager.findOne(
            Sale,
            {
              where: { sale_id: sale.sale_id },
            },
          );
          if (!saleConfirmExisting) {
            throw new Error('Sale not found');
          } else {
            console.log(sale.sale_id)
          }

          // Crear el pago
          const payment = this.paymentRepository.create({
            ...paymentData,
            point_sale: pointSaleEntity,
            sale_id: sale.sale_id,
            paymentDetail: paymentData.paymentDetail,
          });
          await transactionalEntityManager.save(payment);

          if (saleConfirmExisting) {
            console.log(payment)
            console.log(payment.payment_id)
          }

          const paymentDetailsDtos = payment.paymentDetail.map(
            (paymentDetail) => ({
              payment_method: paymentDetail.payment_method,
              total_amount: paymentDetail.total_amount,
              payment: payment.payment_id,
            }),
          );

          await this.paymentDetailsService.createPaymentDeatils(
            paymentDetailsDtos,
            transactionalEntityManager,
          );

          return {sale, payment};
        },
      );
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
