import { AuthGuard } from '@/guards/auth.guard';
import { AuthService } from '@/services/auth/auth.service';
import { Response } from 'express';
import { NEST_COMMON } from "@core-api/nest-core";
import { CatchExceptions } from "@/decorators";

const {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
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
    // try {
    //   const authUser = req.authUser;
    //   if (!authUser) {
    //     return res.status(HttpStatus.UNAUTHORIZED).send("No authorization");
    //   }
    //   const authData = await this.authService.getUser(authUser.user?.id)
    //   return res.status(HttpStatus.OK).send(authData);
    // } catch (error) {
    //   return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    // }
  }

  @Post('login')
  async signIn(
    @Res() res: Response
  ) {
    try {
      return res.status(HttpStatus.OK).send(true);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get()
  async authenticate(
    @Query()
    query: any,
    @Res()
    res: Response
  ) {
    try {
      return res.status(HttpStatus.OK).send(true);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  @Get('profile')
  getProfile(
    @Body()
    req: any,
    @Res()
    res: Response
  ) {
    try {
      return res.status(HttpStatus.OK).send(req.user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}