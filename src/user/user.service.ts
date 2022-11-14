import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthHelper } from '../auth/auth.helper';
import { UserModel } from 'models/user/user.model';
import { from, map, Observable, of } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../models/user/dto/create-user.dto';
import { UpdateFisrtNameDto, UpdateUserDto } from '../models/user/dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {

  /**TODO: Whats the difference of injecting the repo in the constructor 
   * and doing it as in Java (Inversion of control? dependency injection?)
   */
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: UserModel): Promise<UserModel> {
    const { password,
      email,
      firstName,
      lastName} = body

    let user: User | null = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    const newUser: User = this.usersRepository.create({
      password: this.helper.encodePassword(password!),
      email,
      firstName,
      lastName,
    })
    const savedUser: UserModel = await this.usersRepository.save(newUser)
    delete savedUser.password
    return savedUser;
  }

  findAll(): Observable<UserModel[]> {
    return from(this.usersRepository.find()).pipe(
      map((users: User[]) => {
        const usersDto: UserModel[] = users.map((user: User) => {
          let userDto = new UserModel()
          userDto = { ...user }
          delete userDto.password
          return userDto
        })
        return usersDto;
      }))
  }

  findOne(id: number): Observable<UserModel | null> {
    return from(this.usersRepository.findOneBy({ id })).pipe(
      map((user: User) => {
        let userDto = new UserModel()
        userDto = { ...user }
        delete userDto.password
        return userDto
      })
    );
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
  
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  public async updateName(body: UpdateFisrtNameDto, req: any): Promise<User> {
    const user: User = <User>req.user;

    user.firstName = body.firstName;

    return this.usersRepository.save(user);
  }
}
