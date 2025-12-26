import { Todo } from "../model/Todo.model";
import { todoRepository } from "../repo/todo.repo";

class Todoservice {
    async createTodo(todo: Todo ): Promise<Todo> {
        return todoRepository.createTodo(todo);
    }
}

export const todoService = new Todoservice();