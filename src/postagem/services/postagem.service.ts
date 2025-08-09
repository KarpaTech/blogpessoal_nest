import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { TemaService } from "../../tema/services/tema.service";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepository: Repository<Postagem>,
        private temaService:TemaService
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            relations:{
                tema: true,
                usuario: true
            }
        });
    }

    async findById(id: number): Promise<Postagem> {

        const postagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations:{
                tema: true,
                usuario: true
            }
        });

        if (!postagem)
            throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

        return postagem;
    }

    async findAllByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.postagemRepository.find({
            where:{
                titulo: ILike(`%${titulo}%`)
            },
            relations:{
                tema: true,
                usuario: true
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
       
      	await this.temaService.findById(postagem.tema.id)
            
        return await this.postagemRepository.save(postagem);

    }

    async update(postagem: Postagem): Promise<Postagem> {
        
		await this.findById(postagem.id);

		await this.temaService.findById(postagem.tema.id)
                
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
