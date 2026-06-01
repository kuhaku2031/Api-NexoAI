import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CheckInDto } from './dto/check-in.dto';
import { CreateWorkSessionDto } from './dto/create-work-session.dto';
import { UpdateWorkSessionDto } from './dto/update-work-session.dto';
import { WorkSession } from './entities/work-session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from 'src/core/users/entities/user.entity';
import { Status } from 'src/common/enum/status.enum';
import { CheckOutDto } from './dto/check-out.dto';

@Injectable()
export class WorkSessionsService {
  constructor(
    @InjectRepository(WorkSession)
    private workSessionsRepository: Repository<WorkSession>,

    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createWorkSessionDto: CreateWorkSessionDto) {
    const workSession =
      this.workSessionsRepository.create(createWorkSessionDto);
    return this.workSessionsRepository.save(workSession);
  }

  findAll() {
    return `This action returns all workSessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workSession`;
  }

  async checkIn(checkInDto: CheckInDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { user_id: checkInDto.user_id },
        relations: ['company'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.workSessionsRepository.update(
        { user: { user_id: checkInDto.user_id }, status: Status.ACTIVE },
        { status: Status.FORCE_CLOSED, check_out: new Date() },
      );

      await this.usersRepository.update(user.user_id, { is_active: true });

      const workSession = this.workSessionsRepository.create({
        user: { user_id: checkInDto.user_id },
        company: { company_id: user.company_id },
        check_in: new Date(),
        status: Status.ACTIVE,
        total_time: 0,
      });

      return this.workSessionsRepository.save(workSession);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async checkOut(checkOutDto: CheckOutDto) {
    try {
      const user = await this.usersRepository.findOne({
        where: { user_id: checkOutDto.user_id },
        relations: ['company'],
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const activeSession = await this.workSessionsRepository.findOne({
        where: {
          user: { user_id: checkOutDto.user_id },
          status: Status.ACTIVE,
        },
      });

      if (!activeSession) {
        throw new NotFoundException('No active session found');
      }

      const checkOutTime = new Date();
      const checkInTime =
        activeSession.check_in instanceof Date
          ? activeSession.check_in
          : new Date(activeSession.check_in);

      const totalMinutes = Math.floor(
        (checkOutTime.getTime() - checkInTime.getTime()) / 60000,
      );

      await this.usersRepository.update(user.user_id, { is_active: false });

      await this.workSessionsRepository.update(activeSession.id, {
        check_out: checkOutTime,
        status: Status.INACTIVE,
        total_time: totalMinutes,
      });

      return { message: 'Checked out successfully', total_time: totalMinutes };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateWorkSessionDto: UpdateWorkSessionDto) {
    await this.workSessionsRepository.update(id, updateWorkSessionDto);
    return this.workSessionsRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} workSession`;
  }
}
