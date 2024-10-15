import { AuthGuard } from '@/guards/auth.guard';
import { AuthService } from '@/services/auth/auth.service';
import { Response, Request } from 'express';
import { NEST_COMMON } from "@core-api/nest-core";
import { CatchExceptions } from "@/decorators";
import { UserCreationDto } from "@/dtos";


const {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} = NEST_COMMON

@Controller('auth')
@CatchExceptions()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get()
  @UseGuards(AuthGuard)
  async getAuth(
    @Req() req: Request & { authUser: any },
    @Res() res: Response,
  ) {
    try {
      const token = req.headers["Authorization"]?.[0] || "";
      if (!token) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: "no token" });
      }
      const authData = await this.authService.getAuthentication(token)
      return res.status(HttpStatus.OK).send(authData);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
  
  @Post('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const refreshToken = req.cookies['refreshToken'];
      if (!refreshToken) {
        throw res.status(HttpStatus.BAD_REQUEST).send({ message: 'Refresh token not found'});
      }
      const newToken = await this.authService.refreshToken(refreshToken);
      return res.status(HttpStatus.OK).send(newToken);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('login')
  async signIn(
    @Body()
    body: any,
    @Res() res: Response
  ) {
    try {
      const data = await this.authService.login(body);
      return res.status(HttpStatus.OK).send(data);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('register')
  async register(
    @Body()
    body: UserCreationDto,
    @Res() res: Response
  ) {
    try {
      await this.authService.register(body);
      return res.status(HttpStatus.OK).send({});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('reset-password')
  async resetPassword(
    // @Body()
    // body: ResetPasswordDto,
    @Res() res: Response
  ) {
    try {
      // await this.authService.resetPassword(body);
      return res.status(HttpStatus.OK).send({});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}