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

  async signIn(loginData: any): Promise<any> {
    try {
      let authData: any = null;
      if (loginData.token) {
        const decodedToken = await this.jwtService.verify(loginData.token)
        const user = await this.usersService.findOne(decodedToken.user.id, ["roleData"]);
        const newAccessToken = await this.jwtService.sign({
          user,
        })
        authData = {
          access_token: newAccessToken,
          user: user,
        }
      } else {
        if (loginData.email) {
          const user = await this.usersService.findByEmail(loginData.email);
          if (user) {
            const valid = await this.usersService.validatePassword(user, loginData.password);
            if (valid) {
              const newAccessToken = await this.jwtService.sign({
                user,
              })
              authData = {
                access_token: newAccessToken,
                user: user,
              }
            } else {
              throw new HttpException("Invalid password", HttpStatus.UNAUTHORIZED);
            }
          } else {
            throw new HttpException("User not found", HttpStatus.UNAUTHORIZED);
          }
        }
      }
      return authData;
    } catch (error: any) {
      console.log("Login error", error)
      return {
        error,
        exception: new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR),
      };
    }
  }
}
