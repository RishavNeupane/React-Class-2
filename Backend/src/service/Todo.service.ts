import { Todo } from "../model/Todo.model";
import { todoRepository } from "../repo/todo.repo";

class Todoservice {
    async createTodo(todo: Todo ): Promise<Todo> {
        return todoRepository.createTodo(todo);
    }

    async updateTodo(id: number, todo: Partial<Todo>): Promise<Todo | null> {
        return todoRepository.updateTodo(id, todo);
    }

    async getTodoById(id: number): Promise<Todo | null> {
        return todoRepository.getTodoById(id);
    }
     async deleteTodo(id: number): Promise<boolean> {
        return todoRepository.deleteTodo(id);
    }

    async getAllTodos(): Promise<Todo[]> {
        return todoRepository.getAllTodos();
    }
}

export const todoService = new Todoservice();               