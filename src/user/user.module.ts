import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './services/user.service';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from 'strategy/constants';
import { HashService } from './services/hash.service';
import { AuthService } from 'auth/auth.service';
import { JwtStrategy } from 'strategy/jwt.strategy';
import { LocalStrategy } from 'strategy/local.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
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
  controllers: [UserController],
  providers: [UserService, HashService, AuthService, JwtStrategy, LocalStrategy],
  exports: [UserService, HashService]
})
export class UserModule { }
