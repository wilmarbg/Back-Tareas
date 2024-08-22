import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    Request,
  } from '@nestjs/common'
  import { TareasService } from './tareas.service'
  import { TareaDto } from './dto/tarea.dto'
  import { EstadoDto } from './dto/estado.dto'
import { AuthGuard } from 'src/guards/auth/auth.guard'
import { CompletadoDto } from './dto/completado.dto'

@Controller('tareas')
export class TareasController {

    constructor(private readonly tareasService: TareasService) {}

  @UseGuards(AuthGuard)
    @Get()
  async findAll(
    @Request() req: Request,
  ) {
    return await this.tareasService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.tareasService.findOne(+id)
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createDto: TareaDto) {
    return this.tareasService.create(createDto);
  }

  @Post('estado')
  async estado(@Body() estadoDto: EstadoDto) {
    const { id, estado } = estadoDto;
    const result = await this.tareasService.updateEstado(id, estado);
    return result;
  }

  @Post('completado')
  async completado(@Body() completadoDto: CompletadoDto) {
    const { id, completado } = completadoDto;
    const result = await this.tareasService.tareaCompletada(id, completado);
    return result;
  }

  @Patch()
  async update(@Body() updateDto: TareaDto) {
    return this.tareasService.update(updateDto);
  }

}
