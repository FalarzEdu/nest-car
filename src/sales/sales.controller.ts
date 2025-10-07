import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  Version,
} from "@nestjs/common";
import { SalesService } from "./sales.service";
import { ResponseInterceptor } from "../response/response.interceptor";
import { CustomExceptionFilter } from "../custom-exception/custom-exception.filter";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateCarDto } from "../cars/dto/create-car-dto";
import { Sale } from "@prisma/client";
import {CreateSaleDto} from "./DTO/createSaleDto";

@Controller("sales")
@UseInterceptors(ResponseInterceptor)
@UseFilters(CustomExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Version("1")
  @Roles("admin")
  @Get()
  @HttpCode(200)
  // Documentação da Operação
  @ApiOperation({
    summary: "Criar um novo registro de carro",
    description:
      'Endpoint para criar um novo carro na base de dados. Acesso restrito a usuários com perfil de "admin".',
  })
  @ApiBody({
    type: CreateCarDto,
    description: "Dados para a criação de um novo carro.",
    examples: {
      validRequest: {
        summary: "Exemplo de requisição válida",
        value: {
          make: "Toyota",
          model: "Corolla",
          year: 2023,
          colour: "black",
          status: "available",
        },
      },
      invalidRequest: {
        summary: "Exemplo de requisição inválida",
        description: 'Falta o campo obrigatório "model".',
        value: {
          make: "Toyota",
          year: 2023,
          colour: "black",
          status: "available",
        },
      },
    },
  })
  // Documentação das Respostas da API
  @ApiResponse({
    status: 201,
    description: "O carro foi criado com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad Request: Os dados fornecidos são inválidos ou faltam campos obrigatórios.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized: O token de autenticação não foi fornecido ou é inválido.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden: O usuário não tem permissão para executar esta ação (requer perfil "admin").',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found: Algum recurso relacionado não foi encontrado.",
  })
  @ApiResponse({
    status: 409,
    description: "Conflict: Já existe um carro com a mesma placa.",
  })
  @ApiResponse({
    status: 500,
    description:
      "Internal Server Error: Ocorreu um erro inesperado no servidor.",
  })
  showSalesRecord(): Promise<Sale[]> {
    return this.salesService.getAllSales();
  }

  @Version("1")
  @Roles("admin")
  @Post()
  @HttpCode(201)
  // Documentação da Operação
  @ApiOperation({
    summary: "Criar um novo registro de carro",
    description:
      'Endpoint para criar um novo carro na base de dados. Acesso restrito a usuários com perfil de "admin".',
  })
  @ApiBody({
    type: CreateCarDto,
    description: "Dados para a criação de um novo carro.",
    examples: {
      validRequest: {
        summary: "Exemplo de requisição válida",
        value: {
          make: "Toyota",
          model: "Corolla",
          year: 2023,
          colour: "black",
          status: "available",
        },
      },
      invalidRequest: {
        summary: "Exemplo de requisição inválida",
        description: 'Falta o campo obrigatório "model".',
        value: {
          make: "Toyota",
          year: 2023,
          colour: "black",
          status: "available",
        },
      },
    },
  })
  // Documentação das Respostas da API
  @ApiResponse({
    status: 201,
    description: "O carro foi criado com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad Request: Os dados fornecidos são inválidos ou faltam campos obrigatórios.",
  })
  @ApiResponse({
    status: 401,
    description:
      "Unauthorized: O token de autenticação não foi fornecido ou é inválido.",
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden: O usuário não tem permissão para executar esta ação (requer perfil "admin").',
  })
  @ApiResponse({
    status: 404,
    description: "Not Found: Algum recurso relacionado não foi encontrado.",
  })
  @ApiResponse({
    status: 409,
    description: "Conflict: Já existe um carro com a mesma placa.",
  })
  @ApiResponse({
    status: 500,
    description:
      "Internal Server Error: Ocorreu um erro inesperado no servidor.",
  })
  performSale(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
    return this.salesService.performSale(
      createSaleDto.carId,
      createSaleDto.price,
    );
  }
}
