import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dto/create-car-dto";
import { QueryFilterDto } from "./dto/query-filter-dto";
import { ResponseInterceptor } from "../response/response.interceptor";
import { CustomExceptionFilter } from "../custom-exception/custom-exception.filter";
import { JwtAuthGuard } from "../auth/jwt-auth-guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiTags("Cars")
@ApiBearerAuth()
@Controller("cars")
@UseInterceptors(ResponseInterceptor)
@UseFilters(CustomExceptionFilter)
@UseGuards(JwtAuthGuard, RolesGuard)
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Roles("admin")
  @Post()
  @HttpCode(201)
  // Documentação da Operação
  @ApiOperation({
    summary: "Criar um novo registro de carro",
    description:
      'Endpoint para criar um novo carro na base de dados. Acesso restrito a usuários com perfil de "admin".',
  })
  // id  Int @id @default(autoincrement())
  // model String
  // make String
  // year Int
  // colour String
  // status carStatus
  // Documentação do Corpo da Requisição (Payload)
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
  create(@Body() createCar: CreateCarDto) {
    return this.carsService.create(createCar);
  }

  @ApiOperation({ summary: "Recupera todos os carros no banco de dados." })
  @ApiResponse({ status: 200, description: "Carros recuperados." })
  @Roles("user")
  @Get()
  @HttpCode(200)
  findAll(@Query() queryFilter: QueryFilterDto) {
    return this.carsService.findAll(queryFilter.filter, queryFilter.page);
  }

  @ApiOperation({ summary: "Recupera um carro pelo ID no banco de dados." })
  @ApiResponse({ status: 200, description: "Carro recuperado." })
  @Get(":id")
  @HttpCode(200)
  findOne(@Param("id") id: number) {
    return this.carsService.findOne(+id);
  }

  @ApiOperation({ summary: "Altera completamente um carro no banco de dados." })
  @ApiResponse({ status: 200, description: "Carro alterado." })
  @ApiResponse({ status: 403, description: "Não autorizado." })
  @ApiResponse({ status: 422, description: "Dados inválidos." })
  @Roles("admin")
  @Put(":id")
  @HttpCode(200)
  update(@Param("id") id: number, @Body() updateItem: any) {
    return this.carsService.update(id, updateItem);
  }

  @ApiOperation({ summary: "Altera parcialmente um carro no banco de dados." })
  @ApiResponse({ status: 200, description: "Carro alterado." })
  @ApiResponse({ status: 403, description: "Não autorizado." })
  @ApiResponse({ status: 422, description: "Dados inválidos." })
  @Roles("admin")
  @Patch(":id")
  @HttpCode(200)
  partialUpdate(@Param("id") id: number, @Body() updateItem: any) {
    return this.carsService.update(id, updateItem);
  }

  @ApiOperation({ summary: "Deleta um carro do banco de dados." })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Carro deletado." })
  @ApiResponse({ status: 403, description: "Não autorizado." })
  @Roles("admin")
  @Delete(":id")
  @HttpCode(204)
  delete(@Param("id") id: number) {
    return this.carsService.remove(id);
  }
}
