import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Unique } from 'typeorm';


@Entity('work')
@Unique(['title']) 
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('blob', { nullable: true }) 
  image: Buffer;

  @Column({ nullable: true })
  clientUrl?: string;

  @Column({type: 'text', default: 'visible' })
  status: 'visible' | 'hidden';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, user => user.works) 
  user: User;
}
