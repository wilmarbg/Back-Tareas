import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, Length, IsDate } from 'class-validator';

export class EstadoDto {
    @IsNumber()
    @IsOptional()
    id: number;
  
    @IsString()
    @Length(1, 2)
    @IsOptional()
    estado?: string;

  }