import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'; //Importamos o pacote Common com os respectivos decoradores, que serão utilizados na implementação da Classe PostagemController
import { PostagemService } from '../services/postagem.service'; //Importamos a Classe Postagem, do módulo Postagem
import { Postagem } from '../entities/postagem.entity'; // Importamos a Classe PostagemService, que é responsável pela lógica de negócio relacionada à Postagem

@Controller('/postagens') //O decorador @Controller indica que a classe é um RestController, ou seja, ela será responsável por receber e processar as requisições HTTP relacionadas ao recurso Postagem. | A Classe Controladora desempenha o papel de gerenciar as requisições e respostas, dividindo a lógica de manipulação de dados e a de controle de fluxo entre as camadas de Serviço e a camada de Requisição HTTP.
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {} //O Construtor é criado para receber as Injeções de Dependência necessárias para o funcionamento da classe controladora. Neste caso, a Classe PostagemService é injetada no construtor da classe PostagemController. Com isso, podemos acessar todos os métodos e funcionalidades da PostagemService dentro da controladora, permitindo que a lógica de negócios (como a recuperação, criação, atualização e exclusão de postagens) seja delegada ao serviço, mantendo a controladora focada apenas em gerenciar as requisições HTTP.

  @Get() //O decorador @Get() mapeia todas as requisições HTTP GET para o método indicado. Isso significa que, quando uma requisição GET for feita para o endpoint http://localhost:4000/postagens/, o método findAll() será executado para responder a essa requisição. Esse comportamento é típico de métodos que buscam ou retornam dados, e, no contexto da aplicação, o método findAll() irá chamar o método correspondente na Classe PostagemService, para recuperar todas as postagens armazenadas no banco de dados e retorná-las como resposta à requisição. | O uso do decorador @Get() facilita a definição das rotas HTTP dentro do controlador, alinhando-se com o padrão REST, onde o verbo HTTP GET é utilizado para recuperar dados do servidor
  @HttpCode(HttpStatus.OK) //O decorador @HttpCode(HttpStatus.OK) é utilizado para definir o código de status HTTP que será retornado quando a requisição for processada com sucesso. Nesse caso, o status 200 OK será enviado, indicando que a operação foi realizada com êxito. Isso é importante para comunicar ao cliente da API que a requisição foi bem-sucedida. Caso ocorra algum erro durante o processamento (por exemplo, erro no banco de dados ou na execução de alguma lógica de negócios), o código de status será ajustado de acordo com o tipo de erro (como 400 Bad Request, 404 Not Found, ou 500 Internal Server Error)
  findAll(): Promise<Postagem[]> {
    //O método findAll() é um método assíncrono que retorna uma Promise. Isso significa que ele executa operações que podem levar um tempo para serem concluídas (como acessar o banco de dados), mas não bloqueia a execução do restante do código enquanto aguarda a resposta. A Promise será resolvida quando a operação de busca das postagens for concluída, e o resultado será um array contendo todos os objetos da entidade Postagem armazenados no banco de dados
    return this.postagemService.findAll(); // O método findAll() da PostagemService é chamado para realizar a busca de todas as postagens no banco de dados. Esse método irá interagir com o repositório do TypeORM (a partir do postagemRepository) para buscar os dados na tabela correspondente, retornar um array de objetos Postagem e enviá-lo de volta para o controlador. A resposta da requisição será preenchida com esse array de postagens, que será convertido para o formato desejado (geralmente JSON) e enviado como parte da resposta HTTP. | Essa estrutura permite que a lógica de acesso aos dados (busca das postagens) seja isolada no serviço, mantendo o controlador focado em lidar com as requisições HTTP
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByAllTitutlo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findAllByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postagemService.delete(id);
  }
}

/*A Classe Controladora será responsável por:

Receber a requisição HTTP:
URL (Endpoint): Define o caminho da requisição (neste caso, "/postagens").
Verbo HTTP (GET, POST, PUT, DELETE): Indica a operação desejada (neste caso, GET).
Request Body: Para requisições POST e PUT, o corpo da requisição contém os dados a serem manipulados ou persistidos (neste caso, vazio, porque se trata de uma consulta - GET).
Responder à requisição HTTP:
Código de Status HTTP: Indica se a operação foi bem-sucedida (Exemplos: 200 para sucesso, 201 para criação, 404 para não encontrado, entre outros).
Response Body: Contém o resultado do processamento (por exemplo, os dados retornados ou uma mensagem de sucesso/erro).
O parâmetro inserido dentro dos parênteses do decorador @Controller define o caminho do recurso Postagem. Ou seja, todas as requisições enviadas para o caminho /postagens serão direcionadas para a classe controladora PostagemController. Ao acessar a URL do servidor seguida de /postagens (por exemplo, http://localhost:4000/postagens), a classe controladora irá processar a requisição com base no método HTTP (GET, POST, PUT ou DELETE) e os parâmetros inseridos na URL.

Essa abordagem permite centralizar o gerenciamento das rotas e facilitar a organização do código, separando as responsabilidades da manipulação dos dados e o controle da interação com o cliente (frontend ou outros serviços).


source: imgur.com	
ALERTA DE BSM: Mantenha a Atenção aos Detalhes ao configurar a URL do Módulo. Observe que configuramos a URL (/postagens) iniciando com uma barra, com letras minúsculas, usando o mesmo nome do módulo no plural, sem acentos, caracteres especiais e espaços em branco. Lembre-se que todos os endereços na WEB seguem este padrão.
*/
