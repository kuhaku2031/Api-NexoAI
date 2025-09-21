import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CompaniesModule } from '../companies/companies.module';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController,],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    CompaniesModule, 
    UsersModule,
    JwtModule.register({
      secret: 'yourSecretKey', // Secret Key for signing the token
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }), 
  ],
})
export class AuthModule {}
