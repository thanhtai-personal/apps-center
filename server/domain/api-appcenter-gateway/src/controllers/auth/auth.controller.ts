import { AuthService } from '@/services/auth/auth.service';
import { Response, Request } from 'express';
import { NEST_COMMON } from "@core-api/nest-core";
import { CatchExceptions } from "@/decorators";

const {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} = NEST_COMMON

@Controller('auth')
@CatchExceptions()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Get()
  async getAuth(
    @Req() req: Request & { authUser: any },
    @Res() res: Response,
  ) {
    try {
      const authData = await this.authService.getAuthentication(req)
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
      const data = await this.authService.refreshToken(req);
      return res.status(HttpStatus.OK).send(data);
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
      console.log("body", body)
      const data = await this.authService.login(body);
      return res.status(HttpStatus.OK).send(data);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Post('register')
  async register(
    @Body()
    body: any,
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
    @Body()
    body: any,
    @Res() res: Response
  ) {
    try {
      const data = await this.authService.resetPassword(body);
      return res.status(HttpStatus.OK).send({});
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}