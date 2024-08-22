import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 125 })
  titulo: string;

  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'boolean' })
  completado: boolean;

  @Column({ type: 'timestamp without time zone', name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ type: 'timestamp without time zone', name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @Column({ type: 'integer', name: 'usuario_creacion' })
  usuarioCreacion: number;

  @Column({ type: 'integer', name: 'usuario_modificacion' })
  usuarioModificacion: number;

  @Column({ type: 'char', length: 2 })
  estado: string;
}