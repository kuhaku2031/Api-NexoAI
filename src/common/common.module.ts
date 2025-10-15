import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwt.config';

@Module({
    imports: [
            JwtModule.register({
              secret: jwtConstants.accessToken.secret,
              signOptions:{ expiresIn: jwtConstants.accessToken.signOptions },
            }), 
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class CommonModule {}
