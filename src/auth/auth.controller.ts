import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("name") name?: string,
  ) {
    const newUser = await this.authService.register(email, password, name);
    return newUser;
  }

  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(
    @Body("email") email: string,
    @Body("password") password: string,
  ) {
    const jwt = await this.authService.login(email, password);
    return jwt;
  }
}