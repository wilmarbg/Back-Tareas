import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, Length, IsDate } from 'class-validator';

export class TareaDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 125)
  titulo: string;

  @IsString()
  @Length(0, 255)
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  completado?: boolean;

  @IsString()
  @IsOptional()
  fechaCreacion?: string;

  @IsString()
  @IsOptional()
  fechaModificacion?: string;

  @IsNumber()
  @IsOptional()
  usuarioCreacion?: number;

  @IsNumber()
  @IsOptional()
  usuarioModificacion?: number;

  @IsString()
  @Length(1, 2)
  @IsOptional()
  estado?: string;
}