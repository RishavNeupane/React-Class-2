import { ResultSetHeader, RowDataPacket } from 'mysql2';
import {db} from '../config/database';
import { Todo } from '../model/Todo.model';


class TodoRepository   {
    async createTodo(todo: Todo): Promise<Todo> {
        const connection = await db.getConnection();

        const result = await connection.execute<ResultSetHeader>('INSERT INTO todos (title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?)',
            [todo.title, todo.description, todo.status, todo.priority, todo.due_date]);
        return todo;
    }

    async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo | null> {
        const connection = await db.getConnection();


        const fields: string[] = [];
        const values: any[] = [];

        if (todo.title) {
            fields.push("title = ?");
            values.push(todo.title);
        }
        if (todo.description) {
            fields.push("description = ?");
            values.push(todo.description);
        }
        if (todo.status) {
            fields.push("status = ?");
            values.push(todo.status);
        }
        if (todo.priority) {
            fields.push("priority = ?");
            values.push(todo.priority);
        }
        if (todo.due_date) {
            fields.push("due_date = ?");
            values.push(todo.due_date);
        }

        if (fields.length === 0) {
            return null;
        }

        const query = `UPDATE todos SET ${fields.join(", ")} WHERE id = ?`;
        values.push(id);

        const result = await connection.execute<ResultSetHeader>(`UPDATE todos SET ${fields.join(", ")} WHERE id = ?`, [...values, id]);

        if(result[0].affectedRows === 0) return null;
        return this.getTodoById(id);

    }

    async getTodoById(id: number): Promise<Todo | null> {
        const connection = await db.getConnection();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM todos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return null;
        }

        const row = rows[0] as RowDataPacket;
    const todo: Todo = {
        id: row.id,
        title: row.title,
        description: row.description,
        status: row.status,
        priority: row.priority,
        due_date: row.due_date,
        created_at: row.created_at,
        updated_at: row.updated_at,
    };
    return todo;
    }

    async deleteTodo(id: number): Promise<boolean> {
        const connection = await db.getConnection();
        const [result] = await connection.execute<ResultSetHeader>('DELETE FROM todos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    async getAllTodos(): Promise<Todo[]> {
        const connection = await db.getConnection();
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM todos');

        const todos: Todo[] = rows.map((row) => {
            const todo: Todo = {
                id: row.id,
                title: row.title,
                description: row.description,
                status: row.status,
                priority: row.priority,
                due_date: row.due_date,
                created_at: row.created_at,
                updated_at: row.updated_at,
            };
            return todo;
        });
        return todos;
 
   }
}

export const todoRepository = new TodoRepository();