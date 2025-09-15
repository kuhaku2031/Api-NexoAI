import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly companiesService: CompaniesService,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return this.companiesService.create(createAuthDto.name);
  }

  login(LoginAuthDto: LoginAuthDto) {
    return 'This action logs in a user';
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
