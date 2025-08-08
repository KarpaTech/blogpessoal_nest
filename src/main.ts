import { ValidationPipe } from '@nestjs/common'; // Importa a classe ValidationPipe do NestJS.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = ' -03: 00'; // configura o fuso horário da aplicação. Utilizando o comando process.env, definimos a variável de ambiente TZ (Time Zone) com o valor -03:00

  app.useGlobalPipes(new ValidationPipe()); // Ativa a classe ValidationPipe em todas as requisições HTTP. Com isso, utilizando as bibliotecas Class Validator e Class Transformer, é possível definir regras de validação para os atributos das classes entidade (models). Essas regras serão aplicadas em todas as requisições, especialmente nos métodos POST e PUT, verificando os atributos enviados no corpo da requisição para garantir que estejam de acordo com as validações definidas.

  app.enableCors({
    origin: 'https://meusite.com', // Substitua pelo domínio permitido
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
  }); // Habilita o Cross-Origin Resource Sharing (CORS) em toda a aplicação, permitindo que o servidor atenda requisições de diferentes origens.

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

/* Se a classe ValidationPipe não for registrada na Classe main, as regras de validação definidas nos atributos das Classes Entidade não serão aplicadas. Isso significa que os dados enviados nas requisições não serão validados, permitindo que informações inválidas ou incorretas sejam aceitas e persistidas no banco de dados, o que pode comprometer o funcionamento e a integridade da aplicação.
Portanto, é essencial registrar a ValidationPipe globalmente, garantindo que as validações sejam executadas corretamente para todas as requisições que utilizam essas entidades.

As regras de validação no NestJS são implementadas por meio dos Pipes.
Pipes no NestJS funcionam como uma ferramenta poderosa para o processamento de dados. Eles permitem a transformação, sanitização (higienização) e validação dos dados de forma contínua, garantindo que as informações estejam em conformidade com os requisitos especificados nas classes entidade antes de serem manipuladas pelas classes controladoras ou retornadas nas respostas das requisições*/

/*Claim	Descrição
sub (subject)     	    Entidade à quem o token pertence.
iss (issuer)      	    Emissor do token.
exp (expiration)	      Timestamp de quando o token irá expirar.
iat (issued at)     	  Timestamp de quando o token foi criado.
aud (audience)      	  Destinatário do token, representa a aplicação que irá usá-lo.
*/
