import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { CreateTodoInput, UpdateTodoInput, Todo } from "../schema/todo.schema";
import TodoService from "../service/todo.service";
import Context from "../types/context";

@Resolver()
export default class TodoResolver {
    constructor(private todoService: TodoService) {
        this.todoService = new TodoService();
    }

    @Mutation(() => Todo)
    createTodo(
        @Arg("input") input: CreateTodoInput,
        @Ctx() context: Context
    ) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        const userId = context.user._id;
        return this.todoService.createTodo({ ...input, userId });
    }

    @Mutation(() => Todo, { nullable: true })
    updateTodo(
        @Arg("id") id: string,
        @Arg("input") input: UpdateTodoInput,
        @Ctx() context: Context
    ) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        const userId = context.user._id;
        return this.todoService.updateTodo(id, input, userId);
    }

    @Mutation(() => Boolean)
    deleteTodo(
        @Arg("id") id: string,
        @Ctx() context: Context
    ) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        const userId = context.user._id;
        return this.todoService.deleteTodo(id, userId);
    }

    @Query(() => Todo, { nullable: true })
    todo(
        @Arg("id") id: string,
        @Ctx() context: Context
    ) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        const userId = context.user._id;
        return this.todoService.getTodoById(id, userId);
    }

    @Query(() => [Todo])
    todos(@Ctx() context: Context) {
        if (!context.user) {
            throw new Error("Not authenticated");
        }
        const userId = context.user._id;
        return this.todoService.getAllTodos(userId);
    }
}
