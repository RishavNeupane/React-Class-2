import { ResultSetHeader } from 'mysql2';
import {db} from '../config/database';
import { Todo } from '../model/to.model';
class TodoRepository   {
    async createTodo(todo: Todo): Promise<Todo> {
        const connection = await db.getConnection();

        const result = await connection.execute<ResultSetHeader>('INSERT INTO');
        
        return todo;
        
    }
}
