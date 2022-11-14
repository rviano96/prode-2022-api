import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'entities/user.entity';
import { LoginDto, JwtResponseDto } from '../models/auth/auth.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    public async login(body: LoginDto): Promise<JwtResponseDto | never> {
        const { email, password }: LoginDto = body;
        const user: User | null = await this.repository.findOne({ where: { email } });
        if (!user) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }
        const userPassword = await this.getPasswordByEmail(email)
        const isPasswordValid: boolean = this.helper.isPasswordValid(password, userPassword);

        if (!isPasswordValid) {
            throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }

        this.repository.update(user.id, { lastLoginAt: new Date() });

        const jwt = await this.helper.generateToken(user);
        const jwtResponse = new JwtResponseDto()
        jwtResponse.access_token = jwt
        return jwtResponse
    }

    private async getPasswordByEmail(email: string): Promise<string> {
        const userPassword = await this.repository.find({ select: ['password'], where: { email } })
        return userPassword[0].password
    }
    
    public async refresh(user: User): Promise<string> {
        this.repository.update(user.id, { lastLoginAt: new Date() });

        return this.helper.generateToken(user);
    }
}
