import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      this.logger.log(`User created: ${user.email}`);
      return user;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);
      return error;
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAllByCompany(company_id: string) {
    return await this.userRepository.find({
      where: { company_id },
    });
  }

  async updateRefreshToken(email: string, expiresAt: string | null) {
    await this.userRepository.update(
      { email },
      { refresh_token_expires: expiresAt },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
