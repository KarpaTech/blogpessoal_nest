import { IsNotEmpty } from 'class-validator'; //Importamos o pacote Validation com os respectivos decoradores, que serão utilizados para implementar as regras de validação na Classe Postagem.
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'; //Importamos o pacote TypeORM com os respectivos decoradores, necessários para mapear a Classe Postagem como uma entidade e realizar a interação com o Banco de dados.

@Entity({ name: 'tb_postagens' }) //O decorador @Entity é utilizado para marcar a classe como uma entidade, ou seja, uma classe que será mapeada para uma tabela no Banco de dados. O parâmetro name define o nome da tabela no Banco de dados (tb_postagens). Se esse parâmetro não for informado, o TypeORM usará o nome da classe (Postagem) para criar a tabela
//Vale ressaltar que o nome da tabela segue o padrão tb_nome_da_tabela (tb_postagens). O prefixo tb indica que se trata de uma tabela. O nome da tabela é recomendado ser o mesmo da classe, em letras minúsculas, sem espaços em branco, caracteres especiais ou acentos.
export class Postagem {
  //O decorador @Column define que o atributo será adicionado à tabela que será criada no Banco de dados, além de permitir configurar as respectivas propriedades do atributo, como o tipo de dados, tamanho, e outros parâmetros relacionados. É importante reforçar que, caso você não adicione o decorador @Column (exceto para os atributos Chave Primária e Timestamp), o atributo não será inserido na estrutura da tabela. Isso significa que o atributo não será mapeado para uma coluna no Banco de dados, e, portanto, não será persistido ao salvar ou atualizar os dados.
  @PrimaryGeneratedColumn() //O decorador @PrimaryGeneratedColumn indica que o atributo id será a Chave Primária (Primary Key - PK) da tabela tb_postagens. Esse decorador também configura o atributo id para ser gerado automaticamente pelo Banco de dados, utilizando a propriedade auto-incremento. Isso significa que o valor para esse campo será uma sequência numérica, iniciando em 1 e incrementando de 1 em 1 conforme novos registros são inseridos.
  id: number; // Definem os atributos da Classe Postagem, que correspondem aos campos (colunas) na tabela tb_postagens. Abaixo, segue a conversão de tipos de dados TypeScript 🡪 MySQL:

  @IsNotEmpty() //O decorador @IsNotEmpty, que faz parte do pacote Validation, define que o valor do Atributo não pode ser vazio, ou seja, precisa ser enviado algum valor. Importante destacar que este decorador não impede que o usuário envie espaços em branco no valor do atributo.
  @Column({ length: 100, nullable: false })
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto: string;

  @UpdateDateColumn() //O decorador @UpdateDateColumn configura o atributo data como um Timestamp, ou seja, toda vez que um objeto da classe Postagem for criado ou atualizado, o NestJS automaticamente irá preencher esse campo com a data e a hora atuais do Sistema Operacional.
  data: Date;
}
