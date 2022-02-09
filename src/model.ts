import {Entity, PrimaryGeneratedColumn, Column, createConnection, Connection, Repository, ManyToOne, JoinColumn} from 'typeorm';

/*
contains database models
*/

@Entity()
export class Politician {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('text')
  image: string;


}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  email: string;

  @Column()
  ip: string;

}
@Entity()
export class UserVotes {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: "userID" })
  user: User;

  @ManyToOne(() => Politician, { onDelete: 'CASCADE' }) 
  @JoinColumn({ name: "politicianID" })
  politician: Politician;

  @Column()
  isCorrupt: boolean;

}
@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column('text')
  password: string;

}

let connection:Connection;
export async function getRepository(entity:any): Promise<Repository<any>> {
  if (connection===undefined) {
      connection = await createConnection({
        type: 'mysql',
        database: 'corruptornot',
        username: "root",
        password: "",
        synchronize: true,
        entities: [
          Politician,
          User,
          UserVotes,
          Admin
        ],
      });
  }
  return connection.getRepository(entity);
}