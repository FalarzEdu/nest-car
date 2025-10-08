# NestCar

## Autor 
Eduardo Falarz

## Descrição
NestCar é uma API simples construída com o framework NestJS cujo propósito principal é servir como um gerenciador
para revendas de carros.
Suas principais funcionaliades são:

- Registrar carros para venda;
- Registrar venda de um carro;
- Listar os carros disponíveis;
- Listar histórico de vendas

## Link para a API em produção:
https://nest-car-api.onrender.com

## Como executar

### O que será necessário
- Node v22.16.0
- Docker
- NPM (v10.9.2)

### Comandos
Instalar todas as dependências
```
npm install
```

Criar o arquivo `.env`
```
cp .env.example .env
```

Agora, preencha o arquivo com os dados solicitados.

Subir o banco de dados
```
docker compose up
```

Execute as migrações (migrations)
```
npx prisma migrate deploy
```

Executar o projeto em modo de desenvolvimento
```
npm run start:dev
```

## Diagramas de Entidade-Relacionamento

https://dbdiagram.io/d/68e6e048d2b621e422f19cc8

## Documentação Swagger
A documentação gerada é acessível localmente e pela endereço de deploy. São eles:

### Deploy
`nest-car-api.onrender.com/api`

### Local
`{HOST_LOCAL}/api`

#### Exemplo:
`localhost:3000/api`

## Requisitos Avaliativos (RA) e Itens de Desempenho (ID)

#### RA1 - Projetar e desenvolver uma API funcional utilizando o framework NestJS.

- [x] **ID1:** O aluno configurou corretamente o ambiente de desenvolvimento e criou a API utilizando NestJS, com rotas e controladores que seguem a arquitetura modular.
- [x] **ID2:** O aluno aplicou boas práticas de organização da lógica de negócios, garantindo que os services contenham a lógica de negócio e sejam chamados pelos controladores, separando responsabilidades corretamente.
- [x] **ID3:** O aluno utilizou providers e configurou adequadamente a injeção de dependência no NestJS, garantindo uma arquitetura modular e escalável.
- [x] **ID4:** O aluno demonstrou a habilidade de criar e manipular rotas HTTP, manipulando parâmetros de rota, query e body, lidando corretamente com requisições e respostas.
- [x] **ID5:** O aluno aplicou boas práticas de tratamento de erros, utilizando filtros globais e personalizando as mensagens de erro para garantir respostas claras e consistentes.
- [x] **ID6:** O aluno criou classes DTO (Data Transfer Objects) para garantir a validação e consistência dos dados em diferentes endpoints, utilizando pipes para validar entradas de dados.
- [x] **ID7:** O aluno aplicou corretamente pipes de validação no NestJS, verificando entradas inválidas e assegurando a integridade dos dados transmitidos

#### RA2 - Implementar persistência de dados com um banco de dados relacional utilizando Prisma ou TypeORM.

- [x] **ID8:** O aluno modelou corretamente os dados da aplicação, definindo entidades, suas relações e campos necessários, refletidos em um Diagrama de Entidade-Relacionamento (ERD).
- [x] **ID9:** O aluno configurou e conectou a API a um banco de dados relacional (PostgreSQL, MySQL, etc.) utilizando Prisma ou TypeORM.
- [x] **ID10:** O aluno criou e aplicou migrações de banco de dados para garantir a consistência dos dados entre desenvolvimento e produção.
- [x] **ID11:** O aluno implementou corretamente as operações CRUD (Create, Read, Update, Delete) para pelo menos uma entidade no projeto, utilizando NestJS.

#### RA3 - Realizar testes automatizados para garantir a qualidade da API.

- [ ] ~~**ID12:** O aluno implementou testes automatizados (unitários ou de integração) utilizando Jest, validando funcionalidades críticas da API.~~

- [ ] ~~**ID13:** O aluno garantiu a cobertura de testes para, pelo menos, as principais rotas e serviços da API, incluindo operações CRUD.~~

#### RA4 - Gerar a documentação da API e realizar o deploy em um ambiente de produção.

- [x] **ID14:** O aluno integrou corretamente o Swagger à API, gerando a documentação completa e interativa dos endpoints, parâmetros e respostas da API, com exemplos de requisições e respostas.
- [x] **ID15:** O aluno realizou o deploy da API em uma plataforma de hospedagem na nuvem (ex.: Render.com, Heroku, Vercel, etc.), garantindo que a API estivesse acessível publicamente.
- [x] **ID16:** O aluno garantiu que a API funcionasse corretamente no ambiente de produção, incluindo a documentação Swagger e o banco de dados.
- [x] **ID17:** O aluno realizou a configuração correta de variáveis de ambiente usando o ConfigModule do NestJS.
- [x] **ID18:** O aluno implementou corretamente o versionamento de APIs REST no NestJS, assegurando que diferentes versões da API pudessem coexistir.

#### RA5 - Implementar autenticação, autorização e segurança em APIs utilizando JWT, Guards, Middleware e Interceptadores.

- [x] **ID19:** O aluno configurou a autenticação na API utilizando JWT (JSON Web Tokens).
- [x] **ID20:** O aluno implementou controle de acesso baseado em roles e níveis de permissão, utilizando Guards para verificar permissões em rotas específicas.
- [x] **ID21:** O aluno configurou e utilizou middleware para manipular requisições antes que elas chegassem aos controladores, realizando tarefas como autenticação, logging ou tratamento de CORS.
- [x] **ID22:** O aluno implementou interceptadores para realizar logging ou modificar as respostas antes de enviá-las ao cliente.