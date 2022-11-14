import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserModel } from '../../models/user/user.model';
import { map, Observable } from 'rxjs';
import { User } from '../../entities/user.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    //This is used to solve the circular dependecy problem
    @Inject(forwardRef(() => UserService))
    private userService: UserService) { }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
   
    const user: UserModel = request.user;
    return this.userService.findOne(user.id!).pipe(
      map((user: UserModel) => {
        const hasRole = () => roles.indexOf(user.role) > -1
        return hasRole()
      })
    )

  }
}
