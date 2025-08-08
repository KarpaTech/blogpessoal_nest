import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity'; //Importamos a Classe Postagem, que foi definida anteriormente como a Entidade (Model) responsável pela tabela tb_postagens no banco de dados. Essa classe representa a estrutura da tabela e será usada pelo TypeORM para realizar operações de persistência de dados.
import { PostagemModule } from './postagem/postagem.module'; //  Importamos a Classe PostagemModule, que encapsula a lógica do módulo relacionado à Postagem. Esse módulo define como a Entidade Postagem será usada, além de registrar o Service e o Controller necessários para realizar as operações CRUD (Create, Read, Update, Delete)
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // A propriedade type especifica o tipo de banco de dados que será utilizado, neste caso, MySQL.
      host: 'localhost', //A propriedade host define o endereço do servidor onde o banco de dados está hospedado. O valor localhost refere-se ao seu computador local. Caso o banco estivesse na nuvem, seria necessário informar o endereço web correspondente.
      port: 3306, // A propriedade port indica o número da porta associada ao banco de dados. O valor 3306 é a porta padrão do MySQL
      username: 'root', //A propriedade username define o usuário que será utilizado para acessar o banco de dados. O valor root refere-se ao usuário administrador padrão do MySQL
      password: 'root1234', //A propriedade password especifica a senha do usuário definido anteriormente. O valor root é a senha padrão do MySQL (recomenda-se alterar esta senha para produção por questões de segurança).
      database: 'db_blogpessoal', //A propriedade database define o nome do banco de dados que será utilizado, neste caso, db_blogpessoal, que deve ter sido previamente criado no MySQL.
      entities: [Postagem, Tema, Usuario], //A propriedade entities é configurada inicialmente com um array vazio. Após a criação das Classes Entidade, elas serão adicionadas a esse array para que o TypeORM possa gerar as tabelas correspondentes no banco de dados. | Dentro da configuração do banco de dados, no array entities, devemos importar todas as Classes Entidade do módulo. O TypeORM precisa dessas entidades para gerar a estrutura das tabelas no banco de dados. Aqui, estamos incluindo a Classe Postagem para que a tabela tb_postagens seja criada e manipulada corretamente
      synchronize: true, //A propriedade synchronize, definida como true, permite que as tabelas do banco de dados sejam criadas ou atualizadas automaticamente sempre que a aplicação for inicializada. É importante ressaltar que essa configuração afeta apenas a estrutura das tabelas e não os dados contidos nelas. Para ambientes de produção, recomenda-se definir synchronize como false, a fim de evitar alterações indesejadas na estrutura do banco
      logging: true,
    }),
    PostagemModule, //Após a configuração do banco de dados, dentro do array imports, vamos importar todas as Classes Module dos módulos que queremos integrar ao AppModule. Isso garante que as funcionalidades de outros módulos estarão acessíveis. Aqui, inserimos a Classe PostagemModule para garantir que os recursos do módulo de postagem, como a Entidade, Service e Controller, sejam registrados e possam ser utilizados pela aplicação
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

//O endereço localhost refere-se ao servidor local, ou seja, o seu próprio computador.
