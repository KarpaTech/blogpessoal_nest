import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module'; //  Importamos a Classe PostagemModule, que encapsula a lógica do módulo relacionado à Postagem. Esse módulo define como a Entidade Postagem será usada, além de registrar o Service e o Controller necessários para realizar as operações CRUD (Create, Read, Update, Delete)
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
	  useClass: ProdService,
    imports: [ConfigModule],
}),
    PostagemModule, //Após a configuração do banco de dados, dentro do array imports, vamos importar todas as Classes Module dos módulos que queremos integrar ao AppModule. Isso garante que as funcionalidades de outros módulos estarão acessíveis. Aqui, inserimos a Classe PostagemModule para garantir que os recursos do módulo de postagem, como a Entidade, Service e Controller, sejam registrados e possam ser utilizados pela aplicação
    TemaModule,
    AuthModule,
    UsuarioModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

//O endereço localhost refere-se ao servidor local, ou seja, o seu próprio computador.
