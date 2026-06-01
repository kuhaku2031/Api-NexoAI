import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CompaniesService } from '../companies/companies.service';
import { UsersService } from '../users/users.service';
import { IdGenerator } from 'src/common/utils/id-generator.util';
import { HashUtil } from 'src/common/utils/hash.util';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/common/enum/role.enum';
import { jwtConfig } from 'src/config/jwt.config';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashUtil: HashUtil,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const existingCompany = await this.companiesService.findByEmail(
        createAuthDto.email,
      );

      if (existingCompany) {
        throw new BadRequestException('Company already exists with this email');
      }

      const company_id = IdGenerator.generateCompanyId();

      await this.companiesService.create(createAuthDto, company_id);

      const hashedPassword = await this.hashUtil.hashing(
        createAuthDto.password,
      );

      const ownerUser = await this.usersService.create({
        user_id: IdGenerator.generateUserId(createAuthDto.owner_name),
        company_id: company_id,
        email: createAuthDto.email,
        password: hashedPassword,
        first_name: createAuthDto.owner_name,
        last_name: createAuthDto.owner_lastname,
        phone_number: createAuthDto.phone_number,
        role: UserRole.OWNER,
        is_active: true,
      });

      return ownerUser;
    } catch (error) {
      this.logger.error(`Registration error: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const user = await this.usersService.findOneByEmail(loginAuthDto.email);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await this.hashUtil.compare(
        loginAuthDto.password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        company_id: user.company_id,
        email: user.email,
        role: user.role,
      };

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: jwtConfig.refreshToken.secret,
        expiresIn: jwtConfig.refreshToken.expiresIn,
      });

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: jwtConfig.accessToken.secret,
        expiresIn: jwtConfig.accessToken.expiresIn,
      });

      const refreshExpires = new Date();
      refreshExpires.setDate(refreshExpires.getDate() + 7);

      await this.usersService.updateRefreshToken(
        user.email,
        refreshExpires.toISOString(),
      );

      return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
          email: user.email,
          role: user.role,
          company_id: user.company_id,
          first_name: user.first_name,
          last_name: user.last_name,
        },
      };
    } catch (error) {
      this.logger.error(`Login error: ${error.message}`);
      throw new UnauthorizedException(error.message);
    }
  }

  async refreshToken(updateAuthDto: UpdateAuthDto) {
    try {
      const payload = await this.jwtService.verifyAsync(
        updateAuthDto.refresh_token,
        {
          secret: jwtConfig.refreshToken.secret,
        },
      );

      const user = await this.usersService.findOneByEmail(payload.email);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      if (user.refresh_token_expires) {
        const storedExpiry = new Date(user.refresh_token_expires);
        if (storedExpiry < new Date()) {
          throw new UnauthorizedException('Refresh token expired');
        }
      }

      const newAccessToken = await this.jwtService.signAsync(
        {
          company_id: user.company_id,
          email: user.email,
          role: user.role,
        },
        {
          secret: jwtConfig.accessToken.secret,
          expiresIn: jwtConfig.accessToken.expiresIn,
        },
      );

      return {
        access_token: newAccessToken,
      };
    } catch (error) {
      this.logger.error(`Refresh token error: ${error.message}`);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(email: string) {
    await this.usersService.updateRefreshToken(email, null);
  }
}
