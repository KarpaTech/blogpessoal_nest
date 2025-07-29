import { HttpException, HttpStatus, Injectable } from '@nestjs/common'; //Importamos o pacote Common com os respectivos decoradores, utilizados na implementação da classe PostagemService
import { InjectRepository } from '@nestjs/typeorm'; //Importamos o pacote TypeORM com os respectivos decoradores, utilizados na implementação da classe PostagemService
import { DeleteResult, ILike, Repository } from 'typeorm'; // Importamos a classe Repository do módulo typeorm.A classe Repository no TypeORM implementa o Repository Pattern (Padrão de Repositório), que é um padrão arquitetural amplamente utilizado no desenvolvimento de aplicativos escaláveis e de fácil manutenção. Este padrão tem como objetivo separar a lógica de negócios da lógica de acesso a dados, fornecendo uma camada intermediária entre o banco de dados e o restante da aplicação. O Repository Pattern é um padrão de design de software que facilita a abstração da persistência de dados. Ele atua como uma coleção de objetos em memória, oferecendo métodos de acesso a dados (como find, save, update, delete), sem que a aplicação precise se preocupar com os detalhes específicos da implementação da base de dados, como as consultas SQL ou a configuração de conexões.
import { Postagem } from '../entities/postagem.entity'; // Importamos a classe entidade Postagem, do módulo Postagem.

@Injectable() //O decorador @Injectable indica que a classe é um serviço, ou seja, uma classe que pode ser injetada em outras classes por meio da Injeção de Dependências. Injeção de dependência é um padrão de design que visa reduzir o acoplamento entre as classes em um sistema. Em vez de uma classe depender diretamente de outra classe concreta (ou seja, de uma implementação específica), a injeção de dependência permite que as classes dependam de abstrações (interfaces ou classes abstratas), tornando o código mais flexível, modular e de fácil manutenção|Esse padrão permite que as dependências de uma classe (ou seja, os objetos de que ela precisa para funcionar) sejam fornecidas externamente, geralmente por um container de injeção de dependência ou framework, ao invés de serem criadas diretamente dentro da própria classe.| Por exemplo, se uma classe A depende de uma classe B, com a injeção de dependência, a classe A não cria uma instância de B diretamente. Em vez disso, um mecanismo externo (como um framework ou container) fornece uma instância de B para A no momento da execução
export class PostagemService {
  constructor(
    //  Criamos o construtor, que recebe as injeções de dependência necessárias para o desenvolvimento da classe de serviço
    @InjectRepository(Postagem) //O decorador @InjectRepository(Postagem) indica a classe entidade que será utilizada pela injeção de dependência da classe Repository. No caso de PostagemService, o decorador informa ao Nest que o objeto postagemRepository (injeção de dependência) está associado à entidade Postagem
    private postagemRepository: Repository<Postagem>, //Definimos o nome do objeto da classe Repository (postagemRepository), que será responsável por executar os métodos da classe Repository relacionados à entidade Postagem
  ) {}

  async findAll(): Promise<Postagem[]> {
    //Criamos o método assíncrono (async), chamado findAll(), que retorna uma Promise contendo um array de objetos da classe Postagem. Como o método findAll() lista várias postagens, é necessário um array para armazená-las.
    return await this.postagemRepository.find(); //O método find(), da classe postagemRepository, é chamado para retornar todos os registros da entidade Postagem. Em termos SQL, o método find() sem parâmetros seria equivalente a: SELECT * FROM tb_postagens;
  }

  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
    });

    if (!postagem)
      throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

    return postagem;
  }
  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);

    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.postagemRepository.delete(id);
  }
}

/*
linha 9;
Inversão de Controle (IoC)

A Inversão de Controle (IoC) é um princípio de design que altera a sequência tradicional de controle em um sistema. Em um sistema comum, o programador determina a ordem das chamadas de métodos ou a criação de objetos. Com a IoC, a responsabilidade de gerenciar as instâncias de objetos e a execução dos métodos é delegada a um componente externo, geralmente chamado de container de IoC.

Em outras palavras, IoC inverte o controle de fluxo, ou seja, em vez de o programador controlar explicitamente as dependências e a execução do código, essa responsabilidade é transferida para o framework ou container, permitindo uma maior flexibilidade e desacoplamento entre as classes.

IoC no NestJS

No NestJS, a Inversão de Controle é implementada por meio da injeção de dependência (DI). Nesse modelo, as dependências de uma classe não são criadas diretamente dentro dela. Ao invés disso, elas são fornecidas pelo container de dependências do NestJS.

Como funciona?

Quando você cria um serviço, por exemplo, o NestJS automaticamente cuida da injeção de suas dependências (como outros serviços ou repositórios). Através do decorador @Injectable(), o Nest sabe quais classes devem ser injetadas em outras, sem que o desenvolvedor precise se preocupar em instanciá-las manualmente.

Inversão de Dependência (DIP)

A Inversão de Dependência (Dependency Inversion Principle - DIP) é um dos princípios do padrão SOLID e está intimamente relacionado à Inversão de Controle.

O DIP tem como objetivos principais:

Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.
Abstrações não devem depender de detalhes. Detalhes devem depender de abstrações.
No contexto de IoC e DI, isso significa que classes de alto nível (como serviços) não devem depender diretamente de classes de baixo nível (como repositórios ou implementações específicas). Em vez disso, elas devem depender de interfaces ou abstrações, o que permite que as implementações possam ser trocadas de forma mais fácil e sem afetar o restante do sistema.
A principal vantagem de usar a injeção de dependência é que você consegue acessar objetos sem precisar criá-los manualmente, como se fazia na programação orientada a objetos tradicional.

A classe Repository do TypeORM facilita a interação com o banco de dados, oferecendo métodos pré-implementados para manipulação de dados de uma entidade, como salvar, deletar, consultar e atualizar registros de uma tabela.

Outra vantagem da classe Repository é que seus métodos de consulta permitem criar qualquer consulta SQL necessária de forma simples e rápida, sem escrever SQL diretamente 

linha 10;
Observe que, ao criar a injeção de dependência postagemRepository, estamos passando a classe Postagem como tipo genérico da classe Repository. Essa prática implementa os princípios de inversão de controle, conforme demonstrado abaixo:

A classe Repository depende de abstrações, já que, ao invés de estar atrelada a uma implementação específica, ela pode manipular qualquer tipo de entidade (Repository<T>).
A classe Repository não possui forte acoplamento com outras classes, ou seja, não depende diretamente de outras classes para funcionar.
Os métodos da classe Repository estão implementados para trabalhar com qualquer classe entidade passada como tipo genérico.

linha 13;
Funções assíncronas são funções que permitem a execução de tarefas em segundo plano, sem bloquear a execução do restante do código. Isso é extremamente útil em operações que podem levar tempo para serem concluídas, como requisições HTTP, leitura de arquivos ou consultas a bancos de dados, onde o tempo de resposta pode ser imprevisível.

Como Funciona?

Quando uma função é marcada como assíncrona (com a palavra-chave async), ela retorna automaticamente uma Promise. Isso permite que a execução do código continue sem esperar que a função assíncrona seja completada, e, quando a tarefa é concluída, o resultado da operação é disponibilizado para o fluxo do programa.
*/
