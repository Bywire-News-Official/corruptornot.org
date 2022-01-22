import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository} from 'typeorm';

@Entity()
export class Politician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @Column()
  votes: number;

  @Column()
  corrupt: number;

  @Column()
  not_corrupt: number;

}

let connection:Connection;

export async function getPoliticianRepository(): Promise<Repository<Politician>> {
  if (connection===undefined) {
    connection = await createConnection({
      type: 'sqlite',
      database: 'corruptornot',
      synchronize: true,
      entities: [
        Politician
      ],
    });
  }
  return connection.getRepository(Politician);
}