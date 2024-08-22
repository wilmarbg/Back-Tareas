import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column({ unique: true })
  email: string

  //esto nos dice que si hacemos una consulta al usuario no nos retorne la contraseña
  @Column({ select: false })
  password: string

  @Column({ nullable: true })
  codigo: string

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }
}
