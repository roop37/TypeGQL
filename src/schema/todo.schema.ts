import {
    getModelForClass,
    prop,
    index,
    ReturnModelType,
    queryMethod,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import { Field, InputType, ObjectType, ID } from "type-graphql";

function findByTitle(
    this: ReturnModelType<typeof Todo, QueryHelpers>,
    title: Todo["title"]
) {
    return this.findOne({ title });
}

interface QueryHelpers {
    findByTitle: AsQueryMethod<typeof findByTitle>;
}

@index({ title: 1 })
@queryMethod(findByTitle)
@ObjectType()
export class Todo {
    @Field(() => ID)
    _id: string;

    @Field(() => String)
    @prop({ required: true })
    title: string;

    @Field(() => String)
    @prop({ required: true })
    description: string;

    @Field(() => Boolean)
    @prop({ default: false })
    completed: boolean;

    @Field(() => ID)
    @prop({ required: true })
    userId: string; // Associate Todo with a user
}

export const TodoModel = getModelForClass<typeof Todo, QueryHelpers>(Todo);

@InputType()
export class CreateTodoInput {
    @Field(() => String)
    title: string;

    @Field(() => String)
    description: string;

    @Field(() => Boolean, { defaultValue: false })
    completed?: boolean;
}

@InputType()
export class UpdateTodoInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => Boolean, { nullable: true })
    completed?: boolean;
}
