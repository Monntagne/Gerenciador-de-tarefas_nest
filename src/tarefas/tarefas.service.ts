import { Injectable } from '@nestjs/common';
import { connection } from '../database/database';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { RowDataPacket } from 'mysql2';
import { Tarefa } from './interface/tarefa.interface';



@Injectable()
export class TarefasService {
    async listar(){
        const [tarefa]= await connection.query('SELECT * FROM tarefas ORDER BY id DESC')   
        return tarefa
    
    }

async criar(createTarefaDto:CreateTarefaDto){
    const {titulo, descricao, status} = createTarefaDto;
    await connection.query(
        'INSERT INTO tarefas (titulo, descricao, status) VALUES (?,?,?)',
        [titulo, descricao || '', status || 'Pendente']
    );
    return {
        mensagem: 'Tarefa cadastrada com suceso'
    }

}

async buscarPorId(id:number): Promise <Tarefa>{
    const [tarefas] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM tarefas WHERE id =? ',
        [id]
    );
    return tarefas [0] as Tarefa;
}


async atualizar(id: number, updateTarefaDto: UpdateTarefaDto){
    const tarefaAtual = await this.buscarPorId(id);
    
    const titulo = updateTarefaDto.titulo ?? tarefaAtual.titulo;
    const descricao = updateTarefaDto.descricao ?? tarefaAtual.descricao;
    const status = updateTarefaDto.status ?? tarefaAtual.status;

    await connection.query(
        'UPDATE tarefas SET titulo = ?, descricao =?, status =? WHERE id = ?', 
        [titulo, descricao, status, id]
    )
    return {
        mensagem: 'Tarefa atualizada com suceso'
    }
}


async remover(id:number){
    await this.buscarPorId(id);

    await connection.query('DELETE FROM tarefas WHERE id = ?', [id]);
    return{
        mensagem: 'Tarefa removida com sucesso'
    };
}
}
