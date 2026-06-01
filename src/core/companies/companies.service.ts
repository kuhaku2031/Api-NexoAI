import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from '../auth/dto/create-auth.dto';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createAuthDto: CreateAuthDto, companyID: string) {
    try {
      const newCompany = this.companyRepository.create({
        company_id: companyID,
        company_name: createAuthDto.company_name,
        business_type: createAuthDto.business_type,
        email: createAuthDto.email,
        phone_number: createAuthDto.phone_number,
        address: createAuthDto.address,
        city: createAuthDto.city,
        country: createAuthDto.country,
      });

      await this.companyRepository.save(newCompany);

      return newCompany;
    } catch (error) {
      this.logger.error(`Error creating company: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    const companies = await this.companyRepository.find();
    return companies;
  }

  async findByEmail(email: string) {
    const emailsInUse = await this.companyRepository.findOne({
      where: [{ email }],
    });
    return emailsInUse;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
