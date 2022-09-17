import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('livro')
class Livro {

  @PrimaryColumn("text")
  isbn: string;

  @Column("text")
  titulo: string;

  @Column("text")
  subtitulo: string;

  @Column("text")
  autor: string;

  @Column("text")
  editor: string;

  @Column("date")
  data: Date;

  @Column("boolean")
  disponivel: boolean;

}

export { Livro }