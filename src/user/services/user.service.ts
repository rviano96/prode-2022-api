import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'user/dto/create-user.dto';
import { UpdateUserDto } from 'user/dto/update-user.dto';
import { User, UserDocument } from 'user/schema/user.schema';
import { HashService } from './hash.service';
import { User as UserEntity } from 'user/entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity | HttpException> {
    const createUser = new this.userModel(createUserDto);
    const user = await this.findOneByEmail(createUser.email);
    if (user) {
      throw new BadRequestException();
    }
    createUser.password = await this.hashService.hashPassword(createUser.password);
    const createdUser = await createUser.save()
    return this.sanitizeUser(createdUser);
  }

  async findAll() {
    const users = await this.userModel.find();
    return users
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      email
    }).exec();
  }

  async findOneById(id: string) {
    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return this.sanitizeUser(user)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // return user object without password
  private sanitizeUser(user: User): UserEntity {
    const sanitized = new UserEntity(user.email, user.password)
    delete sanitized['password'];
    return sanitized;
  }
}
