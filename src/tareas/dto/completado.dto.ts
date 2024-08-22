import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsNumber, Length, IsDate } from 'class-validator';

export class CompletadoDto {
    @IsNumber()
    @IsOptional()
    id: number;
  
    @IsBoolean()
    @IsOptional()
    completado?: boolean;

  }