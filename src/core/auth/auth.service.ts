import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly companiesService: CompaniesService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {

      // Create company

      // Check if email is already in use
      const existingCompany = await this.companiesService.findByEmail(createAuthDto.email);

      if (existingCompany) {
        throw new BadRequestException('Company already exists with this email');
      }

      // If not, create the company
      this.companiesService.create(createAuthDto)

      // Create user

      const ownerCompany = await this.companiesService.create(createAuthDto);


      return ;
  }

  async login(LoginAuthDto: LoginAuthDto) {
    return ;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
