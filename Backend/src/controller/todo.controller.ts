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
        status: req.body.staus,
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
}