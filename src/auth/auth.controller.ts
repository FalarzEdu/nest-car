import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {LoginDto} from "./dto/login.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: "Cria um usuário a partir de dados válidos.",
  })
  @ApiResponse({ status: 200, description: "Usuário criado." })
  @ApiResponse({ status: 422, description: "Dados inválidos." })
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

  @ApiOperation({
    summary: "Realiza o login a partir de um usuário e uma senha.",
  })
  @ApiResponse({ status: 201, description: "Login com sucesso" })
  @ApiResponse({ status: 401, description: "Credenciais inválidas" })
  @ApiBody({ type: LoginDto })
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: LoginDto) {
    const jwt = await this.authService.login(email, password);
    return jwt;
  }
}