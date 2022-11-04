import {
    Injectable
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
    async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        return await hash(password, saltOrRounds);
    }

    async comparePassword(password: string, hash: string): Promise<Boolean> {
        return await compare(password, hash)
    }
}