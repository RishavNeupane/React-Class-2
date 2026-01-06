import { Request, Response } from "express";
import { Todo } from "../model/Todo.model";
import { todoService } from "../service/Todo.service";
import { ApiResponse } from "../types/ApiResponse.type";

export class TodoController {
  static createTodo(arg0: string, createTodo: any) {
      throw new Error("Method not implemented.");
  }
  createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const todo: Todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        due_date: req.body.due_date,
      };

      const newTodo = await todoService.createTodo(todo);

      const response: ApiResponse = {
        success: true,
        message: "Todo created successfully",
        data: newTodo,
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse = {
        success: false,
        data: null,
        message: "Error creating todo",
        error: error,
      };
      res.status(500).json(response);
    }
  };

  updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const todo: Partial<Todo> = {
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        due_date: req.body.due_date,
      };
      const updateTodo = await todoService.updateTodo(id, todo);
      const response: ApiResponse = {
        success: true,
        message: "Todo updated successfully",
        data: updateTodo,
      };
      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        data: null,
        message: "Error updating todo",
        error: error,
      };
      res.status(500).json(response);
    }
  };

  deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const isDeleted = await todoService.deleteTodo(id);
      const response: ApiResponse = {
        success: isDeleted,
        message: isDeleted
          ? "Todo deleted successfully"
          : "Todo not found or could not be deleted",
        data: null,
      };
      res.status(isDeleted ? 200 : 404).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        data: null,
        message: "Error deleting todo",
        error: error,
      };
      res.status(500).json(response);
    }
  };

  getTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const todo = await todoService.getTodoById(id);
      if (todo) {
        const response: ApiResponse = {
          success: true,
          message: "Todo fetched successfully",
          data: todo,
        };
        res.status(200).json(response);
      }
      else {
        const response: ApiResponse = {
          success: false,
          data: null,
          message: "Todo not found",
        };
        res.status(404).json(response);
      }
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        data: null,
        message: "Error fetching todo",
        error: error,
      };
      res.status(500).json(response);
    }
  };

  getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const todos = await todoService.getAllTodos();
      const response: ApiResponse = {
        success: true,
        message: "Todos fetched successfully",
        data: todos,
      };
      res.status(200).json(response);
    } catch (error: any) {
      const response: ApiResponse = {
        success: false,
        data: null,
        message: "Error fetching todos",
        error: error,
      };
      res.status(500).json(response);
    }
  };
}
export const todoController = new TodoController();