import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tarea } from './entities/tarea.entity'
import { TareaDto } from './dto/tarea.dto'
import * as moment from 'moment';

@Injectable()
export class TareasService {

    constructor(
        @InjectRepository(Tarea)
        private readonly tareaRepository: Repository<Tarea>,
      ) {}

      async findAll() {
        const tareas = await this.tareaRepository.find({
            where: { estado: 'A' },
        })

            const tareasData = tareas.map(tarea => {
            const tareaDto = mapTareaToDto(tarea);
            return tareaDto;
          });
    
          return tareasData;

        }

        async findOne(id: number) {
            const tarea = await this.tareaRepository.findOne({
              where: {
                id,
                estado: 'A',
              },
            })
    
            if (tarea) {

            const response = mapTareaToDto(tarea);
    
              return response
          }
      
    
            return null
        }

        async create(createDto: TareaDto): Promise<TareaDto> {
       
            const tarea = this.tareaRepository.create({
                ...createDto,
                fechaCreacion: moment().toDate(),
                estado: 'A',
              });
              const savedTarea = await this.tareaRepository.save(tarea);
      
              return mapTareaToDto(savedTarea);
    
        }

        async update(updateDto: TareaDto): Promise<TareaDto> {
       
            const tarea = await this.tareaRepository.findOne({ where: { id: updateDto.id } });
            if (!tarea) {
            throw new NotFoundException('Tarea no encontrada');
            }

            tarea.titulo = updateDto.titulo;
            tarea.descripcion = updateDto.descripcion;
            tarea.completado = updateDto.completado;
            tarea.fechaModificacion = moment().toDate();
            tarea.usuarioModificacion = updateDto.usuarioModificacion;

            const updatedTarea = await this.tareaRepository.save(tarea);
      
            return mapTareaToDto(updatedTarea);
    
        }

        async updateEstado(id: number, estado: string) {
    
            try
            {
              const estadoT = await this.tareaRepository.findOne({ where: { id: id } });
    
              if (!estadoT) {
                //throw new Error('Proyecto no encontrado');
                return { error: true, respuesta: 'Tarea no encontrada' };
              }
    
              estadoT.estado = estado;
    
              await this.tareaRepository.save(estadoT);
    
              console.log("DATA: ", estadoT)
    
              return { error: false, respuesta: 'Proceso realizado con éxito' };
    
            }
            catch
            {
              return { error: true, respuesta: 'Error al actualizar el estado' };
            }
    
        }

        async tareaCompletada(id: number, completado: boolean) {
    
            try
            {
              const completadoT = await this.tareaRepository.findOne({ where: { id: id } });
    
              if (!completadoT) {
                return { error: true, respuesta: 'Tarea no encontrada' };
              }
    
              completadoT.completado = completado;
    
              await this.tareaRepository.save(completadoT);
    
              return { error: false, respuesta: 'Proceso realizado con éxito' };
    
            }
            catch
            {
              return { error: true, respuesta: 'Error al actualizar el estado de completado' };
            }
    
        }

}

function mapTareaToDto(tarea: Tarea): TareaDto {
    const response = new TareaDto();
      response.id = tarea.id;
      response.titulo = tarea.titulo;
      response.descripcion = tarea.descripcion;
      response.completado = tarea.completado;
      response.fechaCreacion = moment(tarea.fechaCreacion).format('DD/MM/YYYY HH:mm:ss');
      response.fechaModificacion = moment(tarea.fechaModificacion).format('DD/MM/YYYY HH:mm:ss');
      response.usuarioCreacion = tarea.usuarioCreacion;
      response.usuarioModificacion = tarea.usuarioModificacion;
      response.estado = tarea.estado;

      return response
  }
