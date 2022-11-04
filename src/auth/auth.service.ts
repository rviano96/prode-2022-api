import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'user/schema/user.schema';
import { HashService } from 'user/services/hash.service';
import { UserService } from 'user/services/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private hashService: HashService,
        private jwtService: JwtService) {

    }

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.userService.findOneByEmail(email);
        if (user && (await this.hashService.comparePassword(pass, user.password))) {
            return user;
        }
        return null;
    }

    async login(user: any): Promise<any> {
        const payload = {
            username: user.email,
            sub: user.id
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
