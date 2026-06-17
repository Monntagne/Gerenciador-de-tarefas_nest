import {IsNotEmpty, IsOptional, IsString} from 'class-validator'

export class CreateTarefaDto{
    @IsString()
    @IsNotEmpty()
    titulo?: string;

    @IsString()
    @IsOptional()
    descricao?: string;
    
    @IsString()
    @IsOptional()
    status?: string
}
