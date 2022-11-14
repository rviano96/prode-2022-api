import { Body, ClassSerializerInterceptor, Controller, Inject, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'entities/user.entity';
import {  LoginDto, JwtResponseDto } from '../models/auth/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { URL_AUTH } from 'util/Constants';

@ApiTags('auth')
@Controller(URL_AUTH)
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;

    // @Post('register')
    // @UseInterceptors(ClassSerializerInterceptor)
    // private register(@Body() body: RegisterDto): Promise<User | never> {
    //     return this.service.register(body);
    // }

    @Post('login')
    private login(@Body() body: LoginDto): Promise<JwtResponseDto | never> {
        return this.service.login(body);
    }

    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    private refresh(@Req() { user }: any): Promise<string | never> {
        return this.service.refresh(<User>user);
    }
}
