import {IsOptional, IsString} from 'class-validator'

export class UpdateTarefaDto{
    @IsString()
    @IsOptional()
    titulo?: string;

    @IsString()
    @IsOptional()
    descricao?: string;
    
    @IsString()
    @IsOptional()
    status?: string
}