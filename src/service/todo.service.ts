import { ApolloError } from "apollo-server-errors";
import { CreateTodoInput, UpdateTodoInput, TodoModel } from "../schema/todo.schema";

class TodoService {
    async createTodo(
        input: CreateTodoInput & { userId: string }
    ) {
        try {
            const todo = await TodoModel.create(input);
            return todo;
        } catch (error) {
            throw new ApolloError("Failed to create todo");
        }
    }

    async updateTodo(
        id: string,
        input: UpdateTodoInput,
        userId: string
    ) {
        try {
            const todo = await TodoModel.findOneAndUpdate({ _id: id, userId }, input, { new: true });
            if (!todo) {
                throw new ApolloError("Todo not found");
            }
            return todo;
        } catch (error) {
            throw new ApolloError("Failed to update todo");
        }
    }

    async deleteTodo(
        id: string,
        userId: string
    ) {
        try {
            const result = await TodoModel.findOneAndDelete({ _id: id, userId });
            if (!result) {
                throw new ApolloError("Todo not found");
            }
            return true;
        } catch (error) {
            throw new ApolloError("Failed to delete todo");
        }
    }

    async getTodoById(
        id: string,
        userId: string
    ) {
        try {
            const todo = await TodoModel.findOne({ _id: id, userId });
            if (!todo) {
                throw new ApolloError("Todo not found");
            }
            return todo;
        } catch (error) {
            throw new ApolloError("Failed to get todo");
        }
    }

    async getAllTodos(userId: string) {
        try {
            const todos = await TodoModel.find({ userId });
            return todos;
        } catch (error) {
            throw new ApolloError("Failed to get todos");
        }
    }
}

export default TodoService;
