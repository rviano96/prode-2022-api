import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalStrategy } from 'strategy/local.strategy';
import { User, UserSchema } from 'user/schema/user.schema';
import { HashService } from 'user/services/hash.service';
import { UserService } from 'user/services/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              secret: configService.get<string>("JWT_SECRET"),
              signOptions: {
                expiresIn: '60d'
              },
            })
          }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, HashService],
    exports: [AuthService]
})
export class AuthModule { }
