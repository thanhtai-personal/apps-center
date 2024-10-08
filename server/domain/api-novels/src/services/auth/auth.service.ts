import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
  async getUser(id: string | number): Promise<any> {
    try {
      const user = await this.usersService.findOne(Number(id));
      if (user) {
        return {
          access_token: await this.jwtService.signAsync({ user }),
          user
        };
      } else {
        return {
          error: { message: "unauthorized" },
          exception: new HttpException("unauthorized", HttpStatus.UNAUTHORIZED),
        };
      }
    } catch (error: any) {
      return {
        error,
        exception: new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR),
      };
    }
  }

  async signIn(): Promise<any> {
    try {
      return {
        access_token:"",
        user: ""
      };
    } catch (error: any) {
      console.log("Login error", error)
      return {
        error,
        exception: new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR),
      };
    }
  }
}
