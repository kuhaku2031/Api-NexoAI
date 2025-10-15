import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwt.config';

@Module({
  controllers: [AuthController,],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    CompaniesModule, 
    UsersModule,
    JwtModule.register({
      secret: jwtConstants.accessToken.secret,
      signOptions:{ expiresIn: jwtConstants.accessToken.signOptions },
    }), 
  ],
})
export class AuthModule {}
