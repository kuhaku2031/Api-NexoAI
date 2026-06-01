import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';
import { HashUtil } from 'src/common/utils/hash.util';

@Module({
  controllers: [AuthController],
  providers: [AuthService, HashUtil],
  exports: [AuthService],
  imports: [
    CompaniesModule,
    UsersModule,
    JwtModule.register({
      secret: jwtConfig.accessToken.secret,
      signOptions: { expiresIn: jwtConfig.accessToken.expiresIn },
    }),
  ],
})
export class AuthModule {}
