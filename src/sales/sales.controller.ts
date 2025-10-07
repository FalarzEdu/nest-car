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
import { Sale } from "@prisma/client";
import { CreateSaleDto } from "./DTO/createSaleDto";

@Controller("sales")
@UseInterceptors(ResponseInterceptor)
@UseGuards(JwtAuthGuard, RolesGuard)
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Version("1")
  @Roles("admin")
  @Get()
  @HttpCode(200)
  // Documentação da Operação
  @ApiOperation({
    summary: "Recuperar o histórico completo de vendas",
    description:
      'Endpoint para listar todos os registros de vendas feitos no sistema. Retorna uma lista de objetos de venda, cada um com detalhes do carro associado. Acesso restrito a usuários com perfil de "admin".',
  })
  // Documentação das Respostas da API
  @ApiResponse({
    status: 200,
    description: "O histórico de vendas foi recuperado com sucesso.",
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
    summary: "Registrar uma nova venda de carro",
    description:
      'Endpoint para criar um novo registro de venda. Este processo associa a venda a um carro existente e atualiza o status do carro para "VENDIDO". Acesso restrito a usuários com perfil de "admin".',
  })
  // Documentação do Corpo da Requisição
  @ApiBody({
    type: CreateSaleDto,
    description: "Dados necessários para registrar uma nova venda.",
    examples: {
      validRequest: {
        summary: "Exemplo de requisição válida",
        value: {
          carId: 1,
          price: 79500.5,
        },
      },
      invalidRequest_missingField: {
        summary: "Exemplo de requisição inválida (campo faltando)",
        description: 'Falta o campo obrigatório "carId".',
        value: {
          price: 79500.5,
        },
      },
      invalidRequest_notFound: {
        summary: "Exemplo de requisição inválida (carro não existe)",
        description: "O `carId` 999 não corresponde a um carro disponível.",
        value: {
          carId: 999,
          price: 79500.5,
        },
      },
    },
  })
  // Documentação das Respostas da API
  @ApiResponse({
    status: 201,
    description: "A venda foi registrada com sucesso.",
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad Request: Os dados fornecidos são inválidos ou faltam campos obrigatórios (ex: carId, price).",
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
    description:
      "Not Found: O carro com o ID fornecido não foi encontrado ou não está disponível para venda.",
  })
  @ApiResponse({
    status: 409,
    description: "Conflict: O carro especificado já foi vendido.",
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
